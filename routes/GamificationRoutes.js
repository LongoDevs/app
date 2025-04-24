const express = require('express');
const router = express.Router();
const gamificationController = require('../controllers/gamificationController');

// Get user gamification data (points, level, reward status)
router.get('/user', gamificationController.getUserGamification);

// Get the leaderboard (top users by points)
router.get('/leaderboard', gamificationController.getLeaderboard);

// Claim a reward
router.post('/claim-reward', gamificationController.claimReward);

module.exports = router;
