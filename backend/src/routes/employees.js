const express = require('express');
const db = require('../config/database');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get all employees for organisation
router.get('/', authMiddleware, (req, res) => {
  db.all(
    `SELECT e.*, GROUP_CONCAT(t.name) as teams 
     FROM employees e 
     LEFT JOIN employee_teams et ON e.id = et.employee_id 
     LEFT JOIN teams t ON et.team_id = t.id 
     WHERE e.organisation_id = ? 
     GROUP BY e.id`,
    [req.user.orgId],
    (err, employees) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }
      res.json(employees);
    }
  );
});

// Create employee
router.post('/', authMiddleware, (req, res) => {
  const { firstName, lastName, email, position } = req.body;
  
  db.run(
    'INSERT INTO employees (organisation_id, first_name, last_name, email, position) VALUES (?, ?, ?, ?, ?)',
    [req.user.orgId, firstName, lastName, email, position],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }

      // Create log
      db.run(
        'INSERT INTO logs (organisation_id, user_id, action, details) VALUES (?, ?, ?, ?)',
        [req.user.orgId, req.user.userId, 'employee_created', `Employee ${firstName} ${lastName} created with ID ${this.lastID}`]
      );

      res.json({ id: this.lastID, firstName, lastName, email, position });
    }
  );
});

// Update employee
router.put('/:id', authMiddleware, (req, res) => {
  const { firstName, lastName, email, position } = req.body;
  
  db.run(
    'UPDATE employees SET first_name = ?, last_name = ?, email = ?, position = ? WHERE id = ? AND organisation_id = ?',
    [firstName, lastName, email, position, req.params.id, req.user.orgId],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }

      // Create log
      db.run(
        'INSERT INTO logs (organisation_id, user_id, action, details) VALUES (?, ?, ?, ?)',
        [req.user.orgId, req.user.userId, 'employee_updated', `Employee ID ${req.params.id} updated`]
      );

      res.json({ message: 'Employee updated successfully' });
    }
  );
});

// Delete employee
router.delete('/:id', authMiddleware, (req, res) => {
  db.run(
    'DELETE FROM employees WHERE id = ? AND organisation_id = ?',
    [req.params.id, req.user.orgId],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }

      // Create log
      db.run(
        'INSERT INTO logs (organisation_id, user_id, action, details) VALUES (?, ?, ?, ?)',
        [req.user.orgId, req.user.userId, 'employee_deleted', `Employee ID ${req.params.id} deleted`]
      );

      res.json({ message: 'Employee deleted successfully' });
    }
  );
});

module.exports = router;