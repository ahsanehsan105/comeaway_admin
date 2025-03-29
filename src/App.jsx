import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Home from './components/Home';
import { AuthProvider, AuthContext } from './context/authContext';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
   
  );
}

export default App;