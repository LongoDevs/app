const express = require('express');
const router = express.Router();
const adminController = require('../admin/controller'); // Adjust path if needed

// ==========================
// User Management
// ==========================
router.get('/users', adminController.getUsers);
router.put('/users/:id/role', adminController.updateRole);
router.put('/users/:id/suspend', adminController.suspendUser);
router.delete('/users/:id', adminController.deleteUser);

// ==========================
// Service Management
// ==========================
router.get('/services', adminController.getAllServices);
router.patch('/services/approve/:id', adminController.approveService);
router.patch('/services/reject/:id', adminController.rejectService);

// ==========================
// Admin Settings & Creation
// ==========================
router.post('/settings', adminController.saveSettings);
router.post('/create', adminController.createAdmin);

// ✅ Export router once
module.exports = router;
