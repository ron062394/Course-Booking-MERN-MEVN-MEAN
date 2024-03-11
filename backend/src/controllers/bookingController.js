//bookingController.js
const Booking = require('../models/Booking');
const Course = require('../models/Course');

const getBookings = async (req, res) => {
  const userId = req.user.userId;

  try {
    const bookings = await Booking.find({ user: userId }).populate('course');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createBooking = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.userId;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const existingBooking = await Booking.findOne({
      user: userId,
      course: courseId,
    });
    if (existingBooking) {
      return res.status(400).json({ message: 'Booking already exists' });
    }

    if (course.availableSlots === 0) {
      return res.status(400).json({ message: 'No available slots for the course' });
    }

    const booking = new Booking({
      user: userId,
      course: courseId,
    });

    await booking.save();

    // Decrease available slots for the course
    course.availableSlots -= 1;
    await course.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const cancelBooking = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const booking = await Booking.findOneAndDelete({ _id: id, user: userId });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const course = await Course.findById(booking.course);
    if (course) {
      // Increase available slots for the course
      course.availableSlots += 1;
      await course.save();
    }

    res.json({ message: 'Booking canceled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getBookings,
  createBooking,
  cancelBooking,
};