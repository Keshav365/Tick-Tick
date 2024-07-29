import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './Context/AuthContext'; // Ensure this path is correct
import Dashboard from './Dashboard';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

export default function App() {
  return (
    <AuthContextProvider> {/* Wrap Routes with AuthContextProvider */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}
