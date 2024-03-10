<template>
    <div class="single-course">
      <h2>Single Course</h2>
      <div v-if="course">
        <h3>{{ course.title }}</h3>
        <p>{{ course.description }}</p>
        <p>Instructor: {{ course.instructor }}</p>
        <p>Duration: {{ course.duration }} days</p>
        <p>Available Slots: {{ course.availableSlots }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        course: null,
      };
    },
    mounted() {
      this.fetchCourse();
    },
    methods: {
      async fetchCourse() {
        try {
          const courseId = this.$route.params.id;
          const response = await fetch(`http://localhost:4000/api/courses/${courseId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch course');
          }
          this.course = await response.json();
        } catch (error) {
          console.error(error);
          // Handle error
        }
      },
    },
  };
  </script>
  
  <style src="./SingleCourse.css" scoped></style>
  