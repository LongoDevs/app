/*const { db } = require('../utils/firebase');

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

Original code
*/
const { admin } = require('../utils/firebase');

exports.authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.userId = decodedToken.uid; // Attach UID to request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

