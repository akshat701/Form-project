
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [30, 'Name must be at most 30 characters long'],
    validate: {
      validator: function(v) {
        return /^[A-Za-z\s]+$/.test(v);  
      },
      message: 'Name should contain only alphabetic characters.'
    },
    trim: true  
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);  
      },
      message: 'Please enter a valid email address.'
    }
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v); 
      },
      message: 'Phone number must be 10 digits long.'
    }
  },
  terms: {
    type: Boolean,
    required: true,
    validate: {
      validator: function(v) {
        return v === true; 
      },
      message: 'You must accept the Terms & Conditions.'
    }
  }
});


userSchema.pre('save', function(next) {
  this.name = this.name.replace(/<\/?[^>]+(>|$)/g, "");  
  this.email = this.email.replace(/<\/?[^>]+(>|$)/g, "");  
  this.phone = this.phone.replace(/<\/?[^>]+(>|$)/g, ""); 
  
  
  
  next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;
