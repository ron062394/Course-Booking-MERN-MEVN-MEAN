import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CourseList = () => {
  const [courses, setCourses] = useState([]); // Initialize as an empty array
  const [user, setUser] = useState('');

  useEffect(() => {
    fetch('/api/courses')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => console.error(error));

    // Retrieve user information from local storage on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    // Remove user and token from local storage on logout
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <div>
      <ul className="nav-links">
        <li className="user-greeting">
          <p>Hello, {user}</p>
        </li>
        <li className="logout-button">
          
            <Link to="/login" onClick={handleLogout}><button>Logout</button></Link>
          
        </li>
      </ul>

      <h1>Course list</h1>
      <ul>
        {courses && courses.map((course) => (
          <li className='course-item' key={course._id}>
            <p>Course ID: {course._id}</p>
            <p>Title: {course.title}</p>
            <p>Description: {course.description}</p>
            <p>Instructor: {course.instructor}</p>
            <p>Duration: {course.duration}</p>
            <p>Available Slots: {course.availableSlots}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
