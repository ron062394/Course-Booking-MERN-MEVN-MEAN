import React, { useState } from 'react';

const CourseForm = () => {
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    availableSlots: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');

      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include the token in the Authorization header
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(courseDetails),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Course created:', data);
        // Clear form inputs after successful submission
        setCourseDetails({
          title: '',
          description: '',
          instructor: '',
          duration: '',
          availableSlots: 0,
        });
      } else {
        throw new Error('Failed to create course');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle the error or display an error message to the user
    }
  };


  return (
    <div className="course-form-container">
      <h2>Create a New Course</h2>
      <form onSubmit={handleSubmit} className="course-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={courseDetails.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={courseDetails.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="instructor">Instructor:</label>
          <input
            type="text"
            id="instructor"
            name="instructor"
            value={courseDetails.instructor}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (in weeks):</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={courseDetails.duration}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="availableSlots">Available Slots:</label>
          <input
            type="number"
            id="availableSlots"
            name="availableSlots"
            value={courseDetails.availableSlots}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">Create Course</button>
      </form>
    </div>
  );
};

export default CourseForm;