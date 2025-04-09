const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Route imports
const stationRoutes = require('./routes/stations');
const paymentRoutes = require('./routes/payment');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); // Import booking routes

// Initialize Express
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json()); // Ensure this is applied before the routes

// Connect to MongoDB
mongoose.connect('mongodb+srv://Vidyut:vidyut%40002@vidyutcluster.ea428.mongodb.net/chargingStations?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Use Routes
app.use('/api/stations', stationRoutes); // Ensure this line exists
app.use('/api/payment', paymentRoutes);      // e.g., /api/payment/create-order
app.use('/api/auth', authRoutes);            // e.g., /api/auth/register, /api/auth/login
app.use('/api/users', userRoutes);           // e.g., /api/users/profile
app.use('/api/bookings', bookingRoutes); // Ensure this is registered

// Root route
app.get('/', (req, res) => {
  res.send('Vidyut Backend Server is Running 🚀');
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running on port: ${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Please use a different port.`);
    process.exit(1);
  } else {
    throw err;
  }
});
