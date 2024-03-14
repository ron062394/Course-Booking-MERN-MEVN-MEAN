const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
app.use((req, res, next) => {
  console.log(req.path, req.method);
  if (req.body) {
    console.log('Request body:');
    console.log(req.body);
  }
  next();
});

app.get('/', (req, res) => {
  res.json('Hello')
})

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/courses', require('./src/routes/courseRoutes'));
app.use('/api/bookings', require('./src/routes/bookingRoutes'));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
