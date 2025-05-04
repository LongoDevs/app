const express = require('express');
const router = express.Router();

// Gamification Controllers
const { rateUser } = require('../api/gamification/controllers/ratingController');
const {
  getAllUsers,
  getNearbyUsers,
  getLeaderboard
} = require('../api/gamification/controllers/userController');

// Import other routes
const notificationRoutes = require('./notificationRoutes'); // 🆕 Notifications
const biddingRoutes = require('./biddingRoutes'); // 🆕 Bidding
// const taskTrackingRoutes = require('./taskTrackingRoutes'); // 🆕 (Later if you add Task Tracking)

// Root Welcome Route
router.get('/', (req, res) => {
  res.send('Welcome to the Longo App API!');
});

// Gamification Routes
router.get('/users', getAllUsers);
router.get('/users/nearby', getNearbyUsers);
router.get('/leaderboard', getLeaderboard);
router.post('/rate/:userId', rateUser);

// Notifications Routes
router.use('/notifications', notificationRoutes);

// Bidding Routes
router.use('/bidding', biddingRoutes);

// Task Tracking Routes (future)
// router.use('/tasks', taskTrackingRoutes);

module.exports = router;
