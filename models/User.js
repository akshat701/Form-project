const mongoose = require('mongoose');
const { sanitizeBody } = require('express-validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10
  },
  terms: {
    type: Boolean,
    default: true
  }
});

userSchema.pre('validate', function (next) {
  this.name = this.name.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
  this.email = this.email.replace(/<\/?[^>]+(>|$)/g, "");
  this.phone = this.phone.replace(/<\/?[^>]+(>|$)/g, "");
  next();
});

module.exports = mongoose.model('User', userSchema);
