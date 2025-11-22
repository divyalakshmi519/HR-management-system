import React from 'react';
import './index.css';

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">HR Management System</h1>
        <div className="header-user">
          <span>Welcome, {user?.name || 'User'}</span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;