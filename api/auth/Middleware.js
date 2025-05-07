

// Verify Firebase ID Token
exports.verifyAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// Check for Super Admin Role
exports.verifySuperAdmin = async (req, res, next) => {
  try {
    const userDoc = await db.collection('users').doc(req.user.uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (userDoc.data().role !== 'super_admin') {
      return res.status(403).json({
        message: 'Forbidden: SuperAdmin access required',
        requiredRole: 'super_admin',
        currentRole: userDoc.data().role
      });
    }
    next();
  } catch (error) {
    console.error('SuperAdmin verification error:', error);
    res.status(500).json({ message: 'Authorization failed' });
  }
};

// Check for Admin or Super Admin
exports.verifyAdmin = async (req, res, next) => {
  try {
    const userDoc = await db.collection('users').doc(req.user.uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!['super_admin', 'admin'].includes(userDoc.data().role)) {
      return res.status(403).json({
        message: 'Forbidden: Admin access required',
        allowedRoles: ['super_admin', 'admin'],
        currentRole: userDoc.data().role
      });
    }
    next();
  } catch (error) {
    console.error('Admin verification error:', error);
    res.status(500).json({ message: 'Authorization failed' });
  }
};

// Check for MFA token
exports.verifyMFA = async (req, res, next) => {
  try {
    const userDoc = await db.collection('users').doc(req.user.uid).get();

    if (userDoc.data().mfa_enabled) {
      const mfaToken = req.headers['x-mfa-token'];

      if (!mfaToken) {
        return res.status(400).json({
          message: 'MFA token required',
          mfaRequired: true
        });
      }

      const verified = speakeasy.totp.verify({
        secret: userDoc.data().mfa_secret,
        encoding: 'base32',
        token: mfaToken,
        window: 2
      });

      if (!verified) {
        return res.status(401).json({ message: 'Invalid MFA token' });
      }
    }
    next();
  } catch (error) {
    console.error('MFA verification error:', error);
    res.status(500).json({ message: 'MFA check failed' });
  }
};

// Check for specific permission
exports.checkPermission = (permission) => {
  return async (req, res, next) => {
    try {
      const userDoc = await db.collection('users').doc(req.user.uid).get();

      if (!userDoc.data().permissions[permission]) {
        return res.status(403).json({
          message: `Forbidden: ${permission} permission required`,
          requiredPermission: permission
        });
      }
      next();
    } catch (error) {
      console.error('Permission check error:', error);
      res.status(500).json({ message: 'Permission verification failed' });
    }
  };
};
