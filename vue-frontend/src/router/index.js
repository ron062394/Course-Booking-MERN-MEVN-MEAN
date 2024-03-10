// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import AddCourse from '../pages/AddCourse.vue'; // Import the AddCourse component
import AllCourses from '../pages/AllCourses.vue'; // Import the AddCourse component
import SingleCourse from '../pages/SingleCourse.vue'; // Import the AddCourse component

const routes = [
  // Other routes...
  { path: '/add-course', component: AddCourse }, // Route for AddCourse component
  { path: '/all-courses', component: AllCourses }, // Route for AddCourse component
  { path: '/courses/:id', component: SingleCourse }, // Dynamic route parameter for course ID
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
