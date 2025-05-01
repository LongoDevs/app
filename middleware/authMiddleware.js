// /*const { db } = require('../utils/firebase');

// exports.checkRole = (requiredRole) => async (req, res, next) => {
//   const { userId } = req.body;

//   try {
//     const userDoc = await db.collection('users').doc(userId).get();
//     if (userDoc.exists() && userDoc.data().role === requiredRole) {
//       next(); // User has the required role
//     } else {
//       res.status(403).json({ message: 'Access denied' });
//     }
//   } catch (error) {
//     console.error('Error checking role:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// Original 
// */

// const { admin } = require('../utils/firebase');

// exports.authenticateUser = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   const idToken = authHeader.split('Bearer ')[1];

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     req.userId = decodedToken.uid; // Attach UID to request
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// const jwt = require('jsonwebtoken');

// const protect = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader && authHeader.startsWith('Bearer ')) {
//     const token = authHeader.split(' ')[1];
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded;
//       next();
//     } catch (err) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }
//   } else {
//     return res.status(401).json({ message: 'No token provided' });
//   }
// };
// module.exports = { protect };

// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ message: 'Authorization header missing' });
//   }

//   const token = authHeader.split(' ')[1]; // Format: Bearer TOKEN

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach user info to request
//     next(); // Continue
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };
