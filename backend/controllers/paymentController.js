const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_test_g8TaYj338ZJhV6',
  key_secret: 'NHeulX8m2jN2dwYsYageyIDN'
});

const createOrder = async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount || !currency) {
    console.error('Amount and currency are required');
    return res.status(400).json({ error: 'Amount and currency are required' });
  }

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise (e.g., 100 INR = 10000 paise)
      currency: currency,
      receipt: `receipt_${Date.now()}`
    });
    console.log('Order created:', order);
    res.status(200).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Unable to create order' });
  }
};

module.exports = { createOrder };
