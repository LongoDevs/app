const prisma = require('../../../Database/prisma');

// List available rewards
exports.getRewards = async (req, res) => {
  try {
    const rewards = await prisma.reward.findMany();
    res.json(rewards);
  } catch (error) {
    console.error('❌ Error fetching rewards:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Claim a reward
exports.claimReward = async (req, res) => {
  const { userId, rewardId } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
    const reward = await prisma.reward.findUnique({ where: { id: parseInt(rewardId) } });

    if (!user || !reward) return res.status(404).json({ message: 'User or Reward not found' });

    if (user.points < reward.pointsCost) {
      return res.status(400).json({ message: 'Not enough points to claim reward' });
    }

    await prisma.rewardClaim.create({
      data: {
        userId: user.id,
        rewardId: reward.id,
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        points: user.points - reward.pointsCost,
      },
    });

    res.json({ message: '✅ Reward claimed successfully' });
  } catch (error) {
    console.error('❌ Error claiming reward:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
