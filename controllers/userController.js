const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.renderForm = (req, res) => {
  res.render('form');
};

exports.submitForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('form', { errors: errors.array() });
  }

  try {
    const { name, email, phone } = req.body;
    const user = new User({ name, email, phone });
    await user.save();
    res.send('User saved successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
