import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        Course booking App
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to='/course-form'>Create Courses</Link>
        </li>
        <li>
          <Link>Enroll Course</Link>
        </li>
        <li>
          <Link>My profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
