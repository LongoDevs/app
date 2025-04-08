const { admin } = require('../utils/firebase');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { email, password, fullName, phone, role } = req.body;

  try {
    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Create user document in Firestore
    await User.create({
      uid: userRecord.uid,
      fullName,
      email,
      phone,
      role,
    });

    res.status(201).json({ message: 'User registered successfully', userId: userRecord.uid });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ message: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Firebase Authentication handles login
    const userRecord = await admin.auth().getUserByEmail(email);
    res.status(200).json({ message: 'Login successful', userId: userRecord.uid });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Login failed' });
  }
};

exports.resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Send password reset email
    await admin.auth().generatePasswordResetLink(email);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error sending password reset email:', error.message);
    res.status(500).json({ message: 'Failed to send password reset email' });
  }
};

exports.sendVerificationEmail = async (req, res) => {
    const { email } = req.body;
  
    try {
      const userRecord = await admin.auth().getUserByEmail(email);
      await admin.auth().generateEmailVerificationLink(email);
      res.status(200).json({ message: 'Verification email sent' });
    } catch (error) {
      console.error('Error sending verification email:', error.message);
      res.status(500).json({ message: 'Failed to send verification email' });
    }
  };

  const createUser = async (email, password) => {
    try {
      const userRecord = await admin.auth().createUser({
        email,
        password,
      });
      console.log('User created:', userRecord.uid);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const addUser = async (userData) => {
    try {
      const userRef = db.collection('users').doc(); // Auto-generate a document ID
      await userRef.set({
        full_name: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        points: 0,
        created_at: admin.firestore.FieldValue.serverTimestamp(),
        updated_at: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log('User added with ID:', userRef.id);
      return userRef.id;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  };
  
  module.exports = { addUser };

  const { db } = require('../utils/firebase');

  const getUsersByRole = async (role) => {
    try {
      const usersRef = db.collection('users');
      const snapshot = await usersRef.where('role', '==', role).get();
  
      if (snapshot.empty) {
        console.log('No matching users found.');
        return [];
      }
  
      const users = [];
      snapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
  
      return users;
    } catch (error) {
      console.error('Error querying users:', error);
      throw error;
    }
  };
  
  module.exports = { getUsersByRole };
  
  const { db } = require('../utils/firebase');

  const updateUserPoints = async (userId, pointsDelta) => {
    try {
      const userRef = db.collection('users').doc(userId);
      await userRef.update({
        points: admin.firestore.FieldValue.increment(pointsDelta),
        updated_at: admin.firestore.FieldValue.serverTimestamp(),
      });
      console.log('User points updated successfully');
    } catch (error) {
      console.error('Error updating user points:', error);
      throw error;
    }
  };
  
  module.exports = { updateUserPoints };

  const { db } = require('../utils/firebase');

  const deleteUser = async (userId) => {
    try {
      await db.collection('users').doc(userId).delete();
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };
  
  module.exports = { deleteUser };