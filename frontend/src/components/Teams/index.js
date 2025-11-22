import React from 'react';
import './index.css';

const Teams = ({ onBack }) => {
  return (
    <div className="page-container">
      <div className="page-header">
        <button onClick={onBack} className="back-btn">← Back to Dashboard</button>
        <h2>Teams Management</h2>
      </div>
      <div className="content-placeholder">
        <p>Teams management page - Coming soon!</p>
        <p>This will contain teams list, create teams, and assign employees.</p>
      </div>
    </div>
  );
};

export default Teams;