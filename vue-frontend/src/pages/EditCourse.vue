<template>
    <div>
      <h2>Edit Course</h2>
      <form @submit.prevent="editCourse">
        <!-- Course fields -->
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="course.title" required>
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea id="description" v-model="course.description" required></textarea>
        </div>
        <div>
          <label for="instructor">Instructor:</label>
          <input type="text" id="instructor" v-model="course.instructor" required>
        </div>
        <div>
          <label for="duration">Duration (in days):</label>
          <input type="number" id="duration" v-model.number="course.duration" required>
        </div>
        <div>
          <label for="availableSlots">Available Slots:</label>
          <input type="number" id="availableSlots" v-model.number="course.availableSlots" required>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        courseId: '', // ID of the course being edited
        course: {
          title: '',
          description: '',
          instructor: '',
          duration: 0,
          availableSlots: 0
        }
      };
    },
    mounted() {
      // Fetch course data when component is mounted
      this.courseId = this.$route.params.id; // Retrieve the course ID from route params
      this.fetchCourse();
    },
    methods: {
      async fetchCourse() {
        try {
          const response = await fetch(`http://localhost:4000/api/courses/${this.courseId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch course');
          }
          const data = await response.json();
          this.course = data;
        } catch (error) {
          console.error(error);
          // Handle error
        }
      },
      async editCourse() {
        try {
          const response = await fetch(`http://localhost:4000/api/courses/${this.courseId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.course)
          });
          if (!response.ok) {
            throw new Error('Failed to edit course');
          }
          // Handle success
        } catch (error) {
          console.error(error);
          // Handle error
        }
      }
    }
  };
  </script>
  