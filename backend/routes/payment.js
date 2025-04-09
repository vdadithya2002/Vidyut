const express = require('express');
const Razorpay = require('razorpay');

const router = express.Router();

// ✅ Razorpay instance
const razorpay = new Razorpay({
  key_id: 'rzp_test_g8TaYj338ZJhV6',
  key_secret: 'NHeulX8m2jN2dwYsYageyIDN'
});

// ✅ API route to create an order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ error: 'Amount and currency are required' }); // Validation
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      payment_capture: 1 // ✅ Auto capture payment
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Unable to create order' });
  }
});

module.exports = router;
