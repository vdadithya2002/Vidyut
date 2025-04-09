const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile
} = require('../controllers/userController');

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getAllUsers);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

module.exports = router;
