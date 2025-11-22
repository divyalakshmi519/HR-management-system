import React from 'react';
import './index.css';

const Dashboard = ({ onNavigate }) => {
  const features = [
    {
      title: 'Manage Employees',
      description: 'View, add, edit, and delete employees',
      view: 'employees',
      icon: '👥'
    },
    {
      title: 'Manage Teams',
      description: 'Create teams and assign employees',
      view: 'teams',
      icon: '🏢'
    }
  ];

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">HR Dashboard</h2>
      <p className="dashboard-subtitle">Manage your organisation's human resources</p>
      
      <div className="features-grid">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="feature-card"
            onClick={() => onNavigate(feature.view)}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;