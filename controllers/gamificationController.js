const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get user points and level
exports.getUserGamificationData = async (req, res) => {
  const userId = req.user.id;
  const data = await prisma.userPoints.findUnique({ where: { userId } });
  res.json(data);
};

// Get leaderboard (top users by points)
exports.getLeaderboard = async (req, res) => {
  const leaderboard = await prisma.userPoints.findMany({
    orderBy: { points: 'desc' },
    include: { user: true },
    take: 10,
  });
  res.json(leaderboard);
};

// Get all available rewards
exports.getRewards = async (req, res) => {
  const rewards = await prisma.reward.findMany();
  res.json(rewards);
};

// Claim reward
exports.claimReward = async (req, res) => {
  const userId = req.user.id;
  const rewardId = parseInt(req.body.rewardId);

  const userPoints = await prisma.userPoints.findUnique({ where: { userId } });
  const reward = await prisma.reward.findUnique({ where: { id: rewardId } });

  if (!userPoints || userPoints.points < reward.pointsCost) {
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
};
