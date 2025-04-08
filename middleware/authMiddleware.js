const { db } = require('../utils/firebase');

exports.checkRole = (requiredRole) => async (req, res, next) => {
  const { userId } = req.body;

  try {
    const userDoc = await db.collection('users').doc(userId).get();
    if (userDoc.exists() && userDoc.data().role === requiredRole) {
      next(); // User has the required role
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  } catch (error) {
    console.error('Error checking role:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};