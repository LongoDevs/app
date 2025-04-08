const admin = require('firebase-admin');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Check if Firebase Admin SDK is already initialized to avoid duplicate initialization
if (!admin.apps.length) {
  // Initialize Firebase Admin SDK using the service account key
  const serviceAccount = require('../../path/to/serviceAccountKey.json'); // Replace with your Firebase service account key
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Initialize Firestore
const db = admin.firestore();

// Export Firebase services
module.exports = { admin, db };