const { Op } = require('sequelize');
const User = require('../../../Database/models/models');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

const toRad = (value) => (value * Math.PI) / 180;
exports.getLeaderboard = async (req, res) => {
  const { sortBy = "points", limit = 10 } = req.query;

  const validSortFields = ["points", "average_rating", "ratings_count"];
  const sortField = validSortFields.includes(sortBy) ? sortBy : "points";

  try {
    const users = await User.findAll({
      order: [[sortField, "DESC"]],
      limit: parseInt(limit)
    });

    res.json({ leaderboard: users });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getNearbyUsers = async (req, res) => {
  const { latitude, longitude, radiusInKm = 5 } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Latitude and longitude are required" });
  }

  try {
    const users = await User.findAll({
      where: {
        latitude: { [Op.ne]: null },
        longitude: { [Op.ne]: null }
      }
    });

    const nearbyUsers = users.filter(user => {
      const earthRadiusKm = 6371;
      const dLat = toRad(user.latitude - latitude);
      const dLon = toRad(user.longitude - longitude);
      const lat1 = toRad(latitude);
      const lat2 = toRad(user.latitude);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = earthRadiusKm * c;
      return distance <= radiusInKm;
    });

    res.json({ users: nearbyUsers });
  } catch (error) {
    console.error("Error finding nearby users:", error);
    res.status(500).json({ message: "Server error" });
  }
};
