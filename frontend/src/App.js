import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CourseList from './components/course/CourseList';
import CourseForm from './components/course/CourseForm';
import CourseDetails from './components/course/CourseDetails';

const getToken = () => {
  return localStorage.getItem('token'); // Retrieving the token from localStorage
};

function App() {
  const token = getToken(); // Retrieve the token

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details" element={<CourseDetails />} />
        <Route
          path="/"
          element={token ? <CourseList /> : <Navigate to="/login"/>} // Use replace to avoid adding the login to history
        />
        <Route
          path="/course-form"
          element={token ? <CourseForm /> : <Navigate to="/login"/>} // Use replace to avoid adding the login to history
        />
        
      </Routes>
    </Router>
  );
}

export default App;
