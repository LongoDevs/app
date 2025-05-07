const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const gamificationController = require('./gamification.controller');

// Dummy controllers (replace these with actual logic later)
router.get('/gamification-data', protect, (req, res) => res.json({ points: 50 }));
router.get('/leaderboard', (req, res) => res.json([{ user: 'TopUser', points: 100 }]));
router.get('/rewards', (req, res) => res.json(['Badge', 'Discount']));
router.post('/claim-reward', protect, (req, res) => res.json({ message: 'Reward claimed!' }));
router.get('/users', gamificationController.getAllUsersWithGamification);

module.exports = router;
