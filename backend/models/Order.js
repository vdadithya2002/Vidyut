// models/Order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  razorpayOrderId: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  status: {
    type: String,
    default: 'created', // created, paid, failed
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paymentId: {
    type: String,
  },
  signature: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

module.exports = mongoose.model('Order', orderSchema);
