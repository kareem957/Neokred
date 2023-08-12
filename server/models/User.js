const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, maxlength: 50, match: /^[a-zA-Z\s]*$/ },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, match: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  phoneNumber: { type: String, required: true, match: /^\d{10}$/ },
  address: { type: String, required: true, maxlength: 100 },
  city: { type: String, required: true, match: /^[a-zA-Z\s]*$/, maxlength: 50 },
  state: { type: String, required: true },
  zipCode: { type: String, required: true, match: /^\d{6}$/ },
  country: { type: String, required: true },
  securityQuestion: { type: String, required: true },
  securityAnswer: { type: String, required: true, maxlength: 100 },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
