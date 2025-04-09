const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  cancelBooking,
} = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware

// POST /api/bookings → create a booking
router.post('/', authMiddleware, createBooking);

// GET /api/bookings/mine → get user bookings
router.get('/mine', authMiddleware, getMyBookings); // Ensure this route is defined

// PUT /api/bookings/:id/cancel → cancel a booking
router.put('/:id/cancel', authMiddleware, cancelBooking);

module.exports = router;
