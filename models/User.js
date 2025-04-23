// backend/models/user.js
const { db, admin } = require('../utils/firebase');

class User {
  static async create(userData) {
    const { uid, fullName, email, phone, role } = userData;
    const userRef = db.collection('users').doc(uid);
    await userRef.set({
      full_name: fullName,
      email,
      phone,
      role,
      points: 0,
      level: 1,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    });
    return uid;
  }

  static async findById(uid) {
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      return userDoc.data();
    }
    return null;
  }

  static async updatePoints(uid, newPoints) {
    const userRef = db.collection('users').doc(uid);
    await userRef.update({
      points: newPoints,
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  static async incrementPoints(uid, incrementBy = 1) {
    const userRef = db.collection('users').doc(uid);
    await userRef.update({
      points: admin.firestore.FieldValue.increment(incrementBy),
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    });
  }
}

module.exports = User;
