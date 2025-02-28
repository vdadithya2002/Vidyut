const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const stationRoutes = require('./routes/stations'); // Import station routes
const paymentRoutes = require('./routes/payment'); // Import Razorpay payment routes

// Initialize Express
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Vidyut:vidyut%40002@vidyutcluster.ea428.mongodb.net/chargingStations?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Use Routes
app.use('/api', stationRoutes);  // Handles `/api/stations` and `/api/nearbystations`
app.use('/api/payment', paymentRoutes);  // Handles `/api/create-order`

// Root route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
