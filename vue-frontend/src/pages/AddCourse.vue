<template>
    <div>
      <h2>Add New Course</h2>
      <form @submit.prevent="addCourse">
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="newCourse.title" required>
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea id="description" v-model="newCourse.description" required></textarea>
        </div>
        <div>
          <label for="instructor">Instructor:</label>
          <input type="text" id="instructor" v-model="newCourse.instructor" required>
        </div>
        <div>
          <label for="duration">Duration (in days):</label>
          <input type="number" id="duration" v-model.number="newCourse.duration" required>
        </div>
        <div>
          <label for="availableSlots">Available Slots:</label>
          <input type="number" id="availableSlots" v-model.number="newCourse.availableSlots" required>
        </div>
        <button type="submit">Add Course</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddCourse', 
    data() {
      return {
        newCourse: {
          title: '',
          description: '',
          instructor: '',
          duration: 0,
          availableSlots: 0
        }
      };
    },
    methods: {
        async addCourse() {
  try {
    const response = await fetch('http://localhost:4000/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.newCourse)
    });
    
    // Check if the course was successfully created
    if (response.ok) {
      alert('Course added successfully!');
      // Reset the form
      this.newCourse = {
        title: '',
        description: '',
        instructor: '',
        duration: 0,
        availableSlots: 0
      };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add course');
    }
  } catch (error) {
    console.error(error); // Log the error to the console
    alert(error.message);
  }
}

    }
  };
  </script>
  
  <style src="./AddCourse.css"></style>
