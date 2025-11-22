import React from 'react';
import './index.css';

const Employees = ({ onBack }) => {
  return (
    <div className="page-container">
      <div className="page-header">
        <button onClick={onBack} className="back-btn">← Back to Dashboard</button>
        <h2>Employees Management</h2>
      </div>
      <div className="content-placeholder">
        <p>Employees management page - Coming soon!</p>
        <p>This will contain employee list, add/edit/delete functionality.</p>
      </div>
    </div>
  );
};

export default Employees;