const User = require('../../../Database/models/models');

exports.rateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const ratingRaw = req.body.rating;

    // Force cast to number
    const rating = Number(ratingRaw);

    if (isNaN(rating) || rating < 1 || rating > 10) {
      return res.status(400).json({ message: 'Rating must be between 1 and 10.' });
    }

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Defensive: force current values to numbers or 0
    const currentPoints = Number(user.points ?? 0);
    const currentCount = Number(user.ratings_count ?? 0);

    const updatedPoints = currentPoints + rating;
    const updatedCount = currentCount + 1;

    // Compute average and round
    let updatedAverage = 0;
    if (updatedCount > 0) {
      updatedAverage = parseFloat((updatedPoints / updatedCount).toFixed(2));
    }

    // Log before save
    console.log({
      ratingRaw,
      rating,
      currentPoints,
      currentCount,
      updatedPoints,
      updatedCount,
      updatedAverage
    });

    // Safety check
    if (isNaN(updatedAverage)) {
      return res.status(500).json({ message: '❌ NaN detected — check inputs above' });
    }

    user.points = updatedPoints;
    user.ratings_count = updatedCount;
    user.average_rating = updatedAverage;

    await user.save();

    res.status(200).json({ message: '✅ Rating submitted', user });

  } catch (err) {
    console.error('❌ Save error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
