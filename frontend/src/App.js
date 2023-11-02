import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CourseDetails from './components/course/CourseList';
import Login from './components/auth/Login';

// Function to check if the token exists
const getToken = () => {
  return localStorage.getItem('token'); // Retrieving the token from localStorage
};

function App() {
  const token = getToken(); // Retrieve the token

  return (
    <Router>
      <Routes>
        {/* Route to CourseDetails, with redirect logic */}
        <Route path="/" element={token ? <CourseDetails /> : <Navigate to="/login" />} />
        {/* Route to Login component */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
