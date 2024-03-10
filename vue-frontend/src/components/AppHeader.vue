<template>
  <header>
    <h1>{{ title }}</h1>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <li><router-link to="/add-course">Add Course</router-link></li>
        <li><router-link to="/all-courses">All Course</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      title: 'My Vue App', // Change this to your application name
    };
  },
};
</script>

<style src="./AppHeader.css"></style>
