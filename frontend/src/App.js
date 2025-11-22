import React, { useState, useEffect } from 'react';
import './App.css';

// Import components properly
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import Teams from './components/Teams';
import Header from './components/Common/Header';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setCurrentView('dashboard');
    }
  }, []);

  const handleLogin = (token, userData) => {
    setToken(token);
    setUser(userData);
    localStorage.setItem('token', token);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    setCurrentView('login');
  };

  return (
    <div className="App">
      {token && <Header user={user} onLogout={handleLogout} />}
      
      <main className="main-content">
        {!token && currentView === 'login' && (
          <Login onLogin={handleLogin} onSwitchToRegister={() => setCurrentView('register')} />
        )}
        
        {!token && currentView === 'register' && (
          <Register onRegister={handleLogin} onSwitchToLogin={() => setCurrentView('login')} />
        )}
        
        {token && currentView === 'dashboard' && (
          <Dashboard onNavigate={setCurrentView} />
        )}
        
        {token && currentView === 'employees' && (
          <Employees onBack={() => setCurrentView('dashboard')} />
        )}
        
        {token && currentView === 'teams' && (
          <Teams onBack={() => setCurrentView('dashboard')} />
        )}
      </main>
    </div>
  );
}

export default App;