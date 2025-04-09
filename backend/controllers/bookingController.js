const Booking = require('../models/Booking');

// Create a booking
const createBooking = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debug log to verify request body

    const { station, kwh, amount, paymentId } = req.body;

    // Debug log to verify request data
    console.log('Booking request data:', { station, kwh, amount, paymentId });

    if (!station || !kwh || !amount || !paymentId) {
      console.error('Missing required fields in booking request');
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const booking = new Booking({
      user: req.user.id, // Ensure authMiddleware is attaching the user
      station,
      kwh,
      amount,
      paymentId,
    });

    const savedBooking = await booking.save();
    console.log('Booking saved successfully:', savedBooking); // Debug log
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error('Error in createBooking:', err); // Log the error
    res.status(500).json({ message: 'Booking creation failed', error: err.message });
  }
};

// Get user bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate({
        path: 'station',
        select: 'name location', // Include name and location fields
      })
      .sort({ bookedAt: -1 }); // Sort by booking date

    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err); // Debug log
    res.status(500).json({ message: 'Fetching bookings failed', error: err.message });
  }
};

// Cancel a booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking || booking.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Booking not found or unauthorized' });
    }

    booking.status = 'Cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled', booking });
  } catch (err) {
    res.status(500).json({ message: 'Cancellation failed', error: err });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking,
};
