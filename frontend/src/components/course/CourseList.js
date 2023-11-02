import React, { useEffect, useState } from 'react';

const CourseDetails = () => {
  const [courses, setCourses] = useState([]); // Initialize as an empty array

  useEffect(() => {
    fetch('/api/courses')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Course list</h1>
      <ul>
        {courses && courses.map((course) => (
          <li key={course._id}>
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

export default CourseDetails;
