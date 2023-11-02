//courseRoutes.js
const express = require('express');
const router = express.Router();
const {getCourses, getCourseById, createCourse, updateCourse, deleteCourse} = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware.js');

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', authMiddleware, createCourse);
router.put('/:id', authMiddleware, updateCourse);
router.delete('/:id', authMiddleware, deleteCourse);

module.exports = router;