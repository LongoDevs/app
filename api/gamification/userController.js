const prisma = require('../../../Database/prisma');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        points: true,
        level: true,
      },
    });
    res.json(users);
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Get leaderboard (top users by points)
exports.getLeaderboard = async (req, res) => {
  const { limit = 10 } = req.query;

  try {
    const leaderboard = await prisma.user.findMany({
      orderBy: {
        points: 'desc',
      },
      take: parseInt(limit),
      select: {
        id: true,
        name: true,
        points: true,
        level: true,
      },
    });

    res.json({ leaderboard });
  } catch (error) {
    console.error('❌ Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
