const User = require('../../../Database/models/models');

const prisma = require('../../../Database/prisma');

// Rate a user (add points)
exports.rateUser = async (req, res) => {
  const { userId } = req.params;
  const { rating } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const updatedPoints = user.points + rating;
    let updatedLevel = user.level;

    // Example level up system
    if (updatedPoints >= 100 && user.level < 2) updatedLevel = 2;
    if (updatedPoints >= 500 && user.level < 3) updatedLevel = 3;
    if (updatedPoints >= 1000 && user.level < 4) updatedLevel = 4;

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: {
        points: updatedPoints,
        level: updatedLevel,
      },
    });

    res.json({ message: '✅ Rating submitted', user: updatedUser });
  } catch (error) {
    console.error('❌ Error rating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

