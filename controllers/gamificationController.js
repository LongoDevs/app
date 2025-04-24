const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get user points, level & claimed rewards
exports.getUserGamification = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      points: true,
      level: true,
      claimedRewards: {
        select: {
          id: true,
          title: true,
          pointsCost: true,
        },
      },
    },
  });
  res.json(user);
};

// Top 10 leaderboard by points
exports.getLeaderboard = async (req, res) => {
  const topUsers = await prisma.user.findMany({
    orderBy: { points: 'desc' },
    take: 10,
    select: {
      id: true,
      name: true,
      points: true,
      level: true,
    },
  });
  res.json(topUsers);
};

// Claim reward
exports.claimReward = async (req, res) => {
  const userId = req.user.id;
  const { rewardId } = req.body;

  const reward = await prisma.reward.findUnique({ where: { id: rewardId } });
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!reward || user.points < reward.pointsCost) {
    return res.status(400).json({ message: 'Not enough points or invalid reward.' });
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      points: { decrement: reward.pointsCost },
      claimedRewards: { connect: { id: rewardId } },
    },
  });

  res.json({ message: 'Reward claimed successfully!' });
};

