// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if the password is new or modified
  console.log('Original password before hashing:', this.password); // Debug log
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  console.log('Hashed password:', this.password); // Debug log
  next();
});

// Password match method
userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log('Comparing entered password:', enteredPassword); // Debug log
  console.log('With hashed password:', this.password); // Debug log
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
