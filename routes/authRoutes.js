const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Auth Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/reset-password', authController.resetPassword);
router.post('/send-verification-email', authController.sendVerificationEmail);

// Protected Route Example (Admin Only)
router.post('/admin-only', authMiddleware.checkRole('admin'), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

router.post('/register', async (req, res) => {
  const { fullName, email, phone, role } = req.body;

  try {
    const userId = await addUser({ fullName, email, phone, role });
    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});
module.exports = router;