const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Get unread notifications for dropdown/badge
router.get('/unread', notificationController.getUnreadNotifications);

// Get all notifications history
router.get('/all', notificationController.getAllNotifications);

// Mark a notification as read
router.put('/:id/read', notificationController.markAsRead);

// Admin creates a new notification
router.post('/create', notificationController.createNotification);

module.exports = router;
