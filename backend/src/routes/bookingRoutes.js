//bookingRoute.js
const express = require('express');
const router = express.Router();
const {getBookings, createBooking, cancelBooking } = require('../controllers/bookingController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.get('/', authMiddleware, getBookings);
router.post('/', authMiddleware, createBooking);
router.delete('/:id', authMiddleware, cancelBooking);

module.exports = router;