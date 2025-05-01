const prisma = require('../../database/prisma'); // ✅ Correct import for Prisma

// ==============================
// Get All Users
// ==============================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

// ==============================
// Helper Function for Radians (for location later if needed)
// ==============================
const toRad = (value) => (value * Math.PI) / 180;

// ==============================
// Get Leaderboard
// ==============================
exports.getLeaderboard = async (req, res) => {
  const { sortBy = "points", limit = 10 } = req.query;

  const validSortFields = ["points", "average_rating", "ratings_count"];
  const sortField = validSortFields.includes(sortBy) ? sortBy : "points";

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        [sortField]: 'desc'
      },
      take: parseInt(limit)
    });

    res.json({ leaderboard: users });
  } catch (error) {
    console.error('❌ Error fetching leaderboard:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ==============================
// Rate a User
// ==============================
exports.rateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const ratingRaw = req.body.rating;

    // Force cast to number
    const rating = Number(ratingRaw);

    if (isNaN(rating) || rating < 1 || rating > 10) {
      return res.status(400).json({ message: 'Rating must be between 1 and 10.' });
    }

    // Find user by ID
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Defensive defaults
    const currentPoints = Number(user.points ?? 0);
    const currentCount = Number(user.ratings_count ?? 0);

    const updatedPoints = currentPoints + rating;
    const updatedCount = currentCount + 1;

    let updatedAverage = 0;
    if (updatedCount > 0) {
      updatedAverage = parseFloat((updatedPoints / updatedCount).toFixed(2));
    }

    console.log({
      ratingRaw,
      rating,
      currentPoints,
      currentCount,
      updatedPoints,
      updatedCount,
      updatedAverage
    });

    if (isNaN(updatedAverage)) {
      return res.status(500).json({ message: '❌ NaN detected — check inputs above' });
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: {
        points: updatedPoints,
        ratings_count: updatedCount,
        average_rating: updatedAverage
      }
    });

    res.status(200).json({ message: '✅ Rating submitted', user: updatedUser });

  } catch (err) {
    console.error('❌ Save error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
