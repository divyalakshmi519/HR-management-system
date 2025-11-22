const express = require('express');
const db = require('../config/database');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get all teams for organisation
router.get('/', authMiddleware, (req, res) => {
  db.all(
    `SELECT t.*, COUNT(et.employee_id) as member_count 
     FROM teams t 
     LEFT JOIN employee_teams et ON t.id = et.team_id 
     WHERE t.organisation_id = ? 
     GROUP BY t.id`,
    [req.user.orgId],
    (err, teams) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }
      res.json(teams);
    }
  );
});

// Create team
router.post('/', authMiddleware, (req, res) => {
  const { name, description } = req.body;
  
  db.run(
    'INSERT INTO teams (organisation_id, name, description) VALUES (?, ?, ?)',
    [req.user.orgId, name, description],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }

      // Create log
      db.run(
        'INSERT INTO logs (organisation_id, user_id, action, details) VALUES (?, ?, ?, ?)',
        [req.user.orgId, req.user.userId, 'team_created', `Team ${name} created with ID ${this.lastID}`]
      );

      res.json({ id: this.lastID, name, description });
    }
  );
});

// Assign employee to team
router.post('/:teamId/assign', authMiddleware, (req, res) => {
  const { employeeId } = req.body;
  
  db.run(
    'INSERT INTO employee_teams (employee_id, team_id) VALUES (?, ?)',
    [employeeId, req.params.teamId],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }

      // Create log
      db.run(
        'INSERT INTO logs (organisation_id, user_id, action, details) VALUES (?, ?, ?, ?)',
        [req.user.orgId, req.user.userId, 'employee_assigned', `Employee ${employeeId} assigned to team ${req.params.teamId}`]
      );

      res.json({ message: 'Employee assigned to team successfully' });
    }
  );
});

module.exports = router;