const { admin, db } = require('../utils/firebase');
const speakeasy = require('speakeasy');
const bcrypt = require('bcrypt');

// Login with username & password, and verify MFA if enabled
exports.loginWithMFA = async (req, res) => {
  const { username, password, mfaToken } = req.body;

  try {
    // Find user document by username
    const usersRef = db.collection('users');
    const querySnapshot = await usersRef.where('username', '==', username).limit(1).get();

    if (querySnapshot.empty) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    const uid = userDoc.id;

    // Compare provided password with stored hash
    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // If MFA is enabled, check MFA token
    if (userData.mfa_enabled) {
      if (!mfaToken) {
        return res.status(200).json({ mfaRequired: true, uid });
      }

      const verified = speakeasy.totp.verify({
        secret: userData.mfa_secret,
        encoding: 'base32',
        token: mfaToken,
        window: 2
      });

      if (!verified) {
        return res.status(401).json({ message: 'Invalid MFA token' });
      }
    }

    // Generate Firebase custom token after successful auth
    const token = await admin.auth().createCustomToken(uid);
    return res.status(200).json({ message: 'Login successful', token, uid });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};

// Register new admin with hashed password
exports.registerAdmin = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Firebase Auth user
    const userRecord = await admin.auth().createUser({ email });

    // Save user data in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      username,
      email,
      password: hashedPassword,
      role,
      permissions: {},
      mfa_enabled: false
    });

    res.status(201).json({ message: 'Admin registered', uid: userRecord.uid });
  } catch (error) {
    console.error('Register admin error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

// Generate MFA secret
exports.generateMFASecret = async (req, res) => {
  const secret = speakeasy.generateSecret({ length: 20 });
  res.status(200).json({ secret: secret.base32 });
};

// Verify MFA token and enable MFA
exports.verifyMFAToken = async (req, res) => {
  const { token, secret } = req.body;

  const verified = speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 2
  });

  if (!verified) {
    return res.status(400).json({ message: 'Invalid MFA token' });
  }

  await db.collection('users').doc(req.user.uid).update({
    mfa_enabled: true,
    mfa_secret: secret
  });

  res.status(200).json({ message: 'MFA enabled' });
};

// Disable MFA
exports.disableMFA = async (req, res) => {
  await db.collection('users').doc(req.user.uid).update({
    mfa_enabled: false,
    mfa_secret: admin.firestore.FieldValue.delete()
  });

  res.status(200).json({ message: 'MFA disabled' });
};
// Send password reset email
exports.sendPasswordResetEmail = async (req, res) => {
  const { email } = req.body;

  try {
    await admin.auth().generatePasswordResetLink(email);
    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'Failed to send reset email' });
  }
};

// Change password while logged in
exports.updatePassword = async (req, res) => {
  const { newPassword } = req.body;

  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  try {
    await admin.auth().updateUser(req.user.uid, { password: newPassword });
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({ message: 'Failed to update password' });
  }
};
