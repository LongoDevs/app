const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Notification = sequelize.define("Notification", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("job", "bid", "system"),
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

sequelize
  .sync()
  .then(() => console.log("✅ Notification Table Created"))
  .catch((error) => console.error("❌ Sync error:", error));

module.exports = Notification;
