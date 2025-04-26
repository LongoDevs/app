const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getAdminProfile } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.post('/admin/register', registerAdmin);
router.post('/admin/login', loginAdmin);
router.get('/admin/profile', protect, getAdminProfile);
router.post('/notifications', notificationController.createNotification);
router.get('/notifications/unread', notificationController.getUnreadNotifications);
router.get('/notifications', notificationController.getAllNotifications);
router.patch('/notifications/:id/read', notificationController.markNotificationAsRead);

module.exports = router;
