const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station', // Reference the Station model
    required: true,
  },
  kwh: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Active',
  },
  bookedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
