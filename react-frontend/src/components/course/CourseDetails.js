import React, { useState } from 'react';

const CourseDetails = () => {
  const [courseId, setCourseId] = useState('');
  const [courseDetails, setCourseDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedDetails, setEditedDetails] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    availableSlots: 0,
  });

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}`);
      if (response.ok) {
        const data = await response.json();
        setCourseDetails(data);
        setEditedDetails(data); // Set the edited details to the fetched course details
        setEditMode(false); // Make sure edit mode is off after a new search
      } else {
        throw new Error('Course not found');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle the error or display an error message to the user
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };


  const handleSubmit = async () => {
    try {
      const token = getToken();
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editedDetails),
      });

      if (response.ok) {
        console.log('Course details updated');
        setCourseDetails(editedDetails);
        setEditMode(false);
      } else {
        throw new Error('Failed to update course details');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle the error or display an error message to the user
    }
  };

  const handleDelete = async () => {
    try {
      const token = getToken();
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('Course deleted');
        setCourseDetails(null);
      } else {
        throw new Error('Failed to delete course');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle the error or display an error message to the user
    }
  };

  return (
    <div className="course-details-container">
      <h2>Course Details</h2>
      <input
        type="text"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        placeholder="Enter Course ID"
      />
      <button onClick={handleSearch}>Search</button>

      {courseDetails && (
        <div>
          {editMode ? (
            <div>
              {/* Editable fields */}
              <input
                type="text"
                value={editedDetails.title}
                onChange={(e) => setEditedDetails({ ...editedDetails, title: e.target.value })}
              />
              <input
                type="text"
                value={editedDetails.description}
                onChange={(e) => setEditedDetails({ ...editedDetails, description: e.target.value })}
              />
              <input
                type="text"
                value={editedDetails.instructor}
                onChange={(e) => setEditedDetails({ ...editedDetails, instructor: e.target.value })}
              />
              <input
                type="text"
                value={editedDetails.duration}
                onChange={(e) => setEditedDetails({ ...editedDetails, duration: e.target.value })}
              />
              <input
                type="number"
                value={editedDetails.availableSlots}
                onChange={(e) => setEditedDetails({ ...editedDetails, availableSlots: e.target.value })}
              />
            </div>
          ) : (
            <ul>
              <li key={courseDetails._id}>
                <p>Course ID: {courseDetails._id}</p>
                <p>Title: {courseDetails.title}</p>
                <p>Description: {courseDetails.description}</p>
                <p>Instructor: {courseDetails.instructor}</p>
                <p>Duration: {courseDetails.duration}</p>
                <p>Available Slots: {courseDetails.availableSlots}</p>
              </li>
            </ul>
          )}

          {editMode ? (
            <button onClick={handleSubmit}>Submit</button>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}

          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
