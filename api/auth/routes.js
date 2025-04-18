const express = require('express');
const router = express.Router();
const authController = require('./controller');
const authMiddleware = require('./Middleware');

// Login route (username/password + optional MFA)
router.post('/auth/login', authController.login);

// Register admin (SuperAdmin only)
router.post(
  '/admin/register',
  authMiddleware.verifyAuth,
  authMiddleware.verifySuperAdmin,
  authController.registerAdmin
);

// Generate MFA secret
router.post(
  '/mfa/generate-secret',
  authMiddleware.verifyAuth,
  authController.generateMFASecret
);

// Verify MFA and enable
router.post(
  '/mfa/verify',
  authMiddleware.verifyAuth,
  authController.verifyMFAToken
);

// Disable MFA (admin or super_admin only)
router.post(
  '/mfa/disable',
  authMiddleware.verifyAuth,
  authMiddleware.verifyAdmin,
  authController.disableMFA
);

// Test route - SuperAdmin only
router.get(
  '/test/superadmin',
  authMiddleware.verifyAuth,
  authMiddleware.verifySuperAdmin,
  (req, res) => res.json({ message: 'SuperAdmin access granted' })
);

// Test route - Admin only
router.get(
  '/test/admin',
  authMiddleware.verifyAuth,
  authMiddleware.verifyAdmin,
  (req, res) => res.json({ message: 'Admin access granted' })
);

// Test route - MFA required
router.get(
  '/test/mfa-protected',
  authMiddleware.verifyAuth,
  authMiddleware.verifyMFA,
  (req, res) => res.json({ message: 'MFA verified' })
);

// Send password reset email
router.post('/auth/password-reset', authController.sendPasswordResetEmail);

// Update password while logged in
router.post(
  '/auth/update-password',
  authMiddleware.verifyAuth,
  authController.updatePassword
);

module.exports = router;
