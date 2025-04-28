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
