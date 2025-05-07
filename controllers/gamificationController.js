// Load the shared Prisma instance
const prisma = require('../database/prisma'); // ✅ Adjust path if needed

// ==============================
// Get user gamification data
// ==============================
exports.getUserGamificationData = async (req, res) => {
  const userId = req.user.id;

  try {
    const data = await prisma.userPoints.findUnique({ where: { userId } });
    if (!data) return res.status(404).json({ error: 'User gamification data not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch gamification data' });
  }
};

// ==============================
// Get leaderboard (top 10 users)
// ==============================
exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await prisma.userPoints.findMany({
      orderBy: { points: 'desc' },
      include: { user: true }, // Assumes userPoints has relation to user
      take: 10,
    });
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};

// ==============================
// Get all available rewards
// ==============================
exports.getRewards = async (req, res) => {
  try {
    const rewards = await prisma.reward.findMany();
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rewards' });
  }
};

// ==============================
// Claim a reward
// ==============================
exports.claimReward = async (req, res) => {
  const userId = req.user.id;
  const rewardId = parseInt(req.body.rewardId);

  try {
    const userPoints = await prisma.userPoints.findUnique({ where: { userId } });
    const reward = await prisma.reward.findUnique({ where: { id: rewardId } });

    if (!userPoints || !reward) {
      return res.status(404).json({ error: 'User or reward not found' });
    }

    if (userPoints.points < reward.pointsCost) {
      return res.status(400).json({ error: 'Not enough points to claim this reward.' });
    }

    await prisma.$transaction([
      prisma.userPoints.update({
        where: { userId },
        data: { points: { decrement: reward.pointsCost } },
      }),
      prisma.rewardClaim.create({
        data: { userId, rewardId },
      }),
    ]);

    res.json({ message: 'Reward claimed successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Error claiming reward' });
  }
};

// ==============================
// Get all users with gamification
// ==============================
exports.getAllUsersWithGamification = async (req, res) => {
  try {
    const users = await prisma.userPoints.findMany({
      include: {
        user: true, // Ensure the relation exists in schema.prisma
      },
    });

    res.status(200).json(users);
  } catch (err) {
    console.error('❌ Error fetching all user gamification data:', err);
    res.status(500).json({ error: 'Failed to fetch user gamification data' });
  }
};
