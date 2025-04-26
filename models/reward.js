module.exports = (sequelize, DataTypes) => {
  const Reward = sequelize.define('Reward', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    pointsRequired: DataTypes.INTEGER,
    claimedBy: DataTypes.INTEGER, // optional: FK to user
  });

  return Reward;
};

