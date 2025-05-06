const express = require('express');
const router = express.Router();
const gamificationController = require('../gamification/controller'); // Replace with actual path

// Existing routes (e.g., /rate/:userId)
router.post('/rate/:userId', gamificationController.rateUser);

// ✅ New route to get all users
router.get('/users', gamificationController.getAllUsers);

module.exports = router;
