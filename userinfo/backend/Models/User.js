const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  organizationName: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
