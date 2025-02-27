import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Home from './components/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home  />} /> */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/*" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;