const express = require('express');
const router = express.Router();
const controller = require('../controllers/gamificationController');
const auth = require('../middleware/authMiddleware');

// Get user points and level
router.get('/gamification-data', auth, controller.getUserGamificationData);

// Get top 10 users by points
router.get('/leaderboard', controller.getLeaderboard);

// Get all available rewards
router.get('/rewards', controller.getRewards);

// Claim a reward (authenticated)
router.post('/claim-reward', auth, controller.claimReward);

module.exports = router;
