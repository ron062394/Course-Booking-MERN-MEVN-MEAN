import React, { useEffect, useState } from 'react';

const BookingForm = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/courses');
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          throw new Error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleBooking = async () => {
    // Make the booking request using the selectedCourse ID
    // Include the authorization token in the headers
    // ...
  };

  return (
    <div>
      <h2>Booking Form</h2>
      <select onChange={(e) => setSelectedCourse(e.target.value)}>
        <option value="">Select a course</option>
        {courses.map((course) => (
          <option key={course._id} value={course._id}>
            {course.title}
          </option>
        ))}
      </select>
      <button onClick={handleBooking}>Book Course</button>
    </div>
  );
};

export default BookingForm;
