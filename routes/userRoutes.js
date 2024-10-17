const express = require('express');
const { body, validationResult } = require('express-validator');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/form', userController.renderForm);

router.post(
  '/submit',
  [
    body('name')
      .isLength({ min: 3, max: 30 })
      .withMessage('Name must be between 3 and 30 characters.')
      .isAlpha('en-US', { ignore: ' ' })
      .withMessage('Name must contain only alphabetic characters.'),
    body('email').isEmail().withMessage('Please enter a valid email address.'),
    body('phone')
      .isLength({ min: 10, max: 10 })
      .withMessage('Phone number must be 10 digits long.')
      .isNumeric()
      .withMessage('Phone number must contain only numbers.'),
    body('terms')
      .equals('on')
      .withMessage('You must accept the terms and conditions.')
  ],
  userController.submitForm
);

module.exports = router;
