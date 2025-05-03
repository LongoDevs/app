const express = require('express');
const adminController = require('./controller');

// User management routes
router.get('/users', adminController.getAllUsers);
router.patch('/users/suspend/:id', adminController.suspendUser);
router.delete('/users/:id', adminController.deleteUser);

// Service management routes
router.get('/services', adminController.getAllServices);
router.patch('/services/approve/:id', adminController.approveService);
router.patch('/services/reject/:id', adminController.rejectService);

module.exports = router;

const express = require('express');
const router = express.Router();
const adminController = require('./admin.controller');

// User Management
router.get('/users', adminController.getUsers);
router.put('/users/:id/role', adminController.updateRole);
router.put('/users/:id/suspend', adminController.suspendUser);
router.delete('/users/:id', adminController.deleteUser);

// Settings Management
router.post('/settings', adminController.saveSettings);

// Create New Admin
router.post('/create', adminController.createAdmin);

module.exports = router;
