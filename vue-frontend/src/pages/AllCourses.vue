<template>
  <div class="all-courses">
    <h2>All Courses</h2>
    <ul>
      <li v-for="course in courses" :key="course._id" class="course-item">
        <h3>{{ course.title }}</h3>
        <p>{{ course.description }}</p>
        <p>Instructor: {{ course.instructor }}</p>
        <p>Duration: {{ course.duration }} days</p>
        <p>Available Slots: {{ course.availableSlots }}</p>
        <!-- Add a link to edit the course -->
        <router-link :to="'/courses/' + course._id + '/edit'">Edit</router-link>
        <!-- Add a button to delete the course -->
        <button @click="deleteCourse(course._id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: []
    };
  },
  mounted() {
    this.getAllCourses();
  },
  methods: {
    async getAllCourses() {
      try {
        const response = await fetch('http://localhost:4000/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        this.courses = data;
      } catch (error) {
        console.error(error);
        // Handle error
      }
    },
    async deleteCourse(courseId) {
      try {
        const response = await fetch(`http://localhost:4000/api/courses/${courseId}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Failed to delete course');
        }
        // Remove the course from the courses array
        this.courses = this.courses.filter(course => course._id !== courseId);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    }
  }
};
</script>

<style src="./AllCourses.css"></style>
