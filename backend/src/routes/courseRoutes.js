//courseRoutes.js
const express = require('express');
const router = express.Router();
const {getCourses, getCourseById, createCourse, updateCourse, deleteCourse} = require('../controllers/courseController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;