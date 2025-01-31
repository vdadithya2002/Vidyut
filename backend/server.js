const Razorpay = require('razorpay');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize express
const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Enable Mongoose debugging
mongoose.set('debug', true);

// Connect to MongoDB (using MongoDB Atlas URI)
mongoose.connect('mongodb+srv://Vidyut:vidyut%40002@vidyutcluster.ea428.mongodb.net/chargingStations?retryWrites=true&w=majority&appName=VidyutCluster', {
  tls: true // Enable TLS/SSL
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Sample Charging Station Schema
const stationSchema = new mongoose.Schema({
  name: String,
  location: {
    lat: Number,
    lng: Number
  },
  type: String,  // AC/DC charging
  availableSlots: Number,
  address: String,
  contact: String,
  price: String // Change price to String to include "per kWh"
});

const Station = mongoose.model('Station', stationSchema, 'stations'); // Explicitly specify the collection name

// Root route to prevent "Cannot GET /"
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// API route to get charging stations
app.get('/api/stations', async (req, res) => {
  try {
    const stations = await Station.find();
    console.log('Fetched stations:', stations); // Add console log to verify data
    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch stations' });
  }
});

// Razorpay instance
const razorpay = new Razorpay({
  key_id: 'rzp_test_g8TaYj338ZJhV6',
  key_secret: 'NHeulX8m2jN2dwYsYageyIDN'
});

// API route to create an order
app.post('/create-order', async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount || !currency) {
    console.error('Amount and currency are required');
    return res.status(400).json({ error: 'Amount and currency are required' });
  }

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise (e.g., 100 INR = 10000 paise)
      currency: currency,
    });
    console.log('Order created:', order);
    res.status(200).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Unable to create order' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});