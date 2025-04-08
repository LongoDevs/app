const { db } = require('../utils/firebase');

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
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    });
    return userRef.id;
  }

  static async findById(uid) {
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      return userDoc.data();
    }
    return null;
  }
}

module.exports = User;