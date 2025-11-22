const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const router = express.Router();

// Register Organisation
router.post('/register', async (req, res) => {
  try {
    const { orgName, name, email, password } = req.body;

    // Check if user already exists
    db.get('SELECT id FROM users WHERE email = ?', [email], async (err, user) => {
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create organisation and user
      db.run('INSERT INTO organisations (name) VALUES (?)', [orgName], function(err) {
        if (err) {
          return res.status(500).json({ message: 'Server error' });
        }

        const orgId = this.lastID;

        db.run(
          'INSERT INTO users (organisation_id, name, email, password) VALUES (?, ?, ?, ?)',
          [orgId, name, email, hashedPassword],
          function(err) {
            if (err) {
              return res.status(500).json({ message: 'Server error' });
            }

            const userId = this.lastID;

            // Create log
            db.run(
              'INSERT INTO logs (organisation_id, user_id, action, details) VALUES (?, ?, ?, ?)',
              [orgId, userId, 'organisation_created', `Organisation ${orgName} created`]
            );

            // Generate token
            const token = jwt.sign(
              { userId, orgId, email },
              process.env.JWT_SECRET,
              { expiresIn: '8h' }
            );

            res.json({ token, userId, orgId });
          }
        );
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get(
    `SELECT u.*, o.name as org_name 
     FROM users u 
     JOIN organisations o ON u.organisation_id = o.id 
     WHERE u.email = ?`,
    [email],
    async (err, user) => {
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Create log
      db.run(
        'INSERT INTO logs (organisation_id, user_id, action, details) VALUES (?, ?, ?, ?)',
        [user.organisation_id, user.id, 'user_login', 'User logged in']
      );

      const token = jwt.sign(
        { userId: user.id, orgId: user.organisation_id, email },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );

      res.json({ token, userId: user.id, orgId: user.organisation_id, orgName: user.org_name });
    }
  );
});

module.exports = router;


