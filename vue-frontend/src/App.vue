<template>
  <div id="app">
    <Header /> <!-- This will render the Header.vue component -->
    <router-view /> <!-- This will render the current route component -->
  </div>
</template>

<script>
import Header from './components/AppHeader.vue'; // Import the Header component

export default {
  name: 'App',
  components: {
    Header, // Register the Header component
  },
};
</script>

<style>
/* Add global styles here */
#app {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>
