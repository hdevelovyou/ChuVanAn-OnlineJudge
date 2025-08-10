import React, { useState } from 'react';
import './App.css';
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';

function App() {
  const [page, setPage] = useState('home');

  return (
    <>
    {page === 'home' && (
      <HomePage
        onLogin={() => setPage('login')}
        onRegister={() => setPage('register')}
      />
    )}
    {page === 'login' && <Login onBack={() => setPage('home')} />}
    {page === 'register' && <Register onBack={() => setPage('home')} />}
    </>
  );
}

export default App;
