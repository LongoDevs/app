const express = require('express');
const router = express.Router();

const { registerAdmin, loginAdmin, getAdminProfile } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const notificationController = require('../controllers/notificationController');

console.log('Handlers:', {
    createNotification: typeof notificationController.createNotification,
    getUnreadNotifications: typeof notificationController.getUnreadNotifications,
    getAllNotifications: typeof notificationController.getAllNotifications,
    markNotificationAsRead: typeof notificationController.markNotificationAsRead,
  });
  
// Admin authentication
router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);
router.get('/admin/profile', protect, getAdminProfile);

// Notifications (protected)
router.post('/notifications', protect, notificationController.createNotification);
router.get('/notifications/unread', protect, notificationController.getUnreadNotifications);
router.get('/notifications', protect, notificationController.getAllNotifications);
router.patch('/notifications/:id/read', protect, notificationController.markNotificationAsRead);

module.exports = router;
