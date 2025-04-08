const { admin, db } = require('../utils/firebase'); // Import Firebase services
const multer = require('multer'); // For handling file uploads

// Initialize Firebase Storage bucket
const bucket = admin.storage().bucket();

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

/**
 * Create a profile
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
exports.createProfile = async (req, res) => {
  const { userId, fullName, email, phone, role } = req.body;

  try {
    // Create profile document in Firestore
    await db.collection('users').doc(userId).set({
      full_name: fullName,
      email,
      phone,
      role,
      profile_photo: '', // Default empty
      location: '', // Default empty
      bio: '', // Default empty
      experience_years: 0, // Default 0
      specialties: [], // Default empty array
      trophies: [], // Default empty array
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ message: 'Profile created successfully', userId });
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ message: 'Profile creation failed' });
  }
};

/**
 * Update a profile
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
exports.updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { fullName, phone, location, bio, experienceYears, specialties } = req.body;

  try {
    const profileRef = db.collection('users').doc(userId);

    // Update profile fields
    await profileRef.update({
      full_name: fullName,
      phone,
      location,
      bio,
      experience_years: experienceYears,
      specialties,
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Profile update failed' });
  }
};

/**
 * Get a profile
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
exports.getProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const profileRef = db.collection('users').doc(userId);
    const profileDoc = await profileRef.get();

    if (!profileDoc.exists) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const profileData = profileDoc.data();
    res.status(200).json(profileData);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

/**
 * Upload profile image
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
exports.uploadProfileImage = async (req, res) => {
  const { userId } = req.params;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    // Upload file to Firebase Storage
    const blob = bucket.file(`profile-images/${userId}/${file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (error) => {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'File upload failed' });
    });

    blobStream.on('finish', async () => {
      // Get the public URL of the uploaded file
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      // Update profile with the image URL
      await db.collection('users').doc(userId).update({
        profile_photo: publicUrl,
        updated_at: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.status(200).json({ message: 'Profile image uploaded successfully', imageUrl: publicUrl });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error('Error uploading profile image:', error);
    res.status(500).json({ message: 'Profile image upload failed' });
  }
};

// Export the upload middleware for use in routes
exports.upload = upload;