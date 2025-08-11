import React, { useState } from 'react';
import './App.css';
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';

function App() {
  const [page, setPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  const handleLoginSuccess = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    localStorage.setItem('username', username);
    setPage('home');
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setPage('home');
  }

  return (
    <>
    {page === 'home' && (
      <HomePage
        onLogin={() => setPage('login')}
        onRegister={() => setPage('register')}
        isLoggedIn={isLoggedIn}
        username={username}
        onLogout={handleLogout}
      />
    )}
    {page === 'login' && ( 
      <Login 
        onBack={() => setPage('home')}
        onLoginSuccess={handleLoginSuccess} 
      />
    )}
    {page === 'register' && ( 
      <Register onBack={() => setPage('home')} 
        onRegisterSuccess={handleLoginSuccess}
      />
    )}
    </>
  );
}

export default App;
