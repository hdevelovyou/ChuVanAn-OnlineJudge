import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import ProblemDetail from './components/Problems/ProblemDetail';
import ProblemList from './components/Problems/ProblemList';
import SubmitCode from './components/Submissions/SubmitCode';
import SubmissionsList from './components/Submissions/SubmissionsList';
import BestSubmissions from './components/Submissions/BestSubmissions';
import AdminAddProblem from './components/Problems/AdminAddProblem';
import AllSubmissions from './components/Submissions/AllSubmissions';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('role') === 'admin');
  const navigate = useNavigate();

  const handleLoginSuccess = (username, role) => {
    setIsLoggedIn(true);
    setUsername(username);
    setIsAdmin(role === 'admin');
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);
    navigate('/');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    navigate('/');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            onLogin={() => navigate('/login')}
            onRegister={() => navigate('/register')}
            isLoggedIn={isLoggedIn}
            username={username}
            onLogout={handleLogout}
            onViewProblems={() => navigate('/problems')}
          />
        }
      />
      <Route
        path="/login"
        element={
          <Login
            onBack={() => navigate('/')}
            onLoginSuccess={handleLoginSuccess}
          />
        }
      />
      <Route
        path="/register"
        element={
          <Register
            onBack={() => navigate('/')}
            onRegisterSuccess={handleLoginSuccess}
          />
        }
      />
      <Route
        path="/problems"
        element={
          <ProblemList
            onSelect={id => navigate(`/problems/${id}`)}
            isAdmin={isAdmin}
            onAdminAddProblem={() => navigate('/admin/add-problem')}
          />
        }
      />
      <Route
        path="/admin/add-problem"
        element={
          <AdminAddProblem
            onSuccess={() => navigate('/problems')}
            onBack={() => navigate('/problems')}
          />
        }
      />
      <Route
        path="/problems/:problemId"
        element={
          <ProblemDetail
            onSubmitClick={id => navigate(`/problems/${id}/submissions`)}
            onViewAllSubmissions={id => navigate(`/problems/${id}/submissions`)}
            onViewBestSubmissions={id => navigate(`/problems/${id}/best`)}
          />
        }
      />
      <Route
        path="/submissions/all"
        element={
          <AllSubmissions/>
        }
      />
      <Route
        path="/problems/:problemId/submit"
        element={
          <SubmitCode 
            onViewAllSubmissions={id => navigate(`/problems/${id}/submissions`)}            
          />
        }
      />
      <Route
        path="/problems/:problemId/submissions"
        element={
          <SubmissionsList
            onBack={id => navigate(`/problems/${id}`)}
          />}
      />
      <Route
        path="/problems/:problemId/best"
        element={
          <BestSubmissions
            onBack={id => navigate(`/problems/${id}`)}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
