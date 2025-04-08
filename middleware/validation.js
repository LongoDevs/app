const { body, validationResult } = require('express-validator');

// Validation rules for profile creation/update
exports.validateProfile = [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('phone').isMobilePhone().withMessage('Invalid phone number'),
  body('role').isIn(['admin', 'client', 'service_provider']).withMessage('Invalid role'),
];

// Middleware to handle validation errors
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};