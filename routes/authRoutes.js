const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Auth Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/reset-password', authController.resetPassword);
router.post('/send-verification-email', authController.sendVerificationEmail);

router.post('/admin-only', authMiddleware.checkRole('admin'), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

module.exports = router;
