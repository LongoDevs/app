const express = require('express');
const profileController = require('../controllers/profileController');
const validation = require('../middleware/validation');

const router = express.Router();

// Create profile
router.post(
  '/profile',
  validation.validateProfile,
  validation.handleValidationErrors,
  profileController.createProfile
);

// Update profile
router.put(
  '/profile/:userId',
  validation.validateProfile,
  validation.handleValidationErrors,
  profileController.updateProfile
);

// Get profile
router.get('/profile/:userId', profileController.getProfile);

// Upload profile image
router.post(
  '/profile/:userId/image',
  profileController.upload.single('image'), // Use the upload middleware
  profileController.uploadProfileImage
);

module.exports = router;