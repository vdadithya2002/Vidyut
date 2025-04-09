require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'vidyut';

// User Registration
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Don't hash manually — let schema do it
    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ token, user: { id: newUser._id, name, email } });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed', error });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.error('Missing email or password');
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.error(`User not found for email: ${email}`);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Comparing entered password:', password); // Debug log
    console.log('With hashed password:', user.password); // Debug log
    const isMatch = await user.matchPassword(password);
    console.log('Password comparison result:', isMatch); // Debug log

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    console.log('Generated token:', token); // Debug log
    res.status(200).json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error });
  }
};
