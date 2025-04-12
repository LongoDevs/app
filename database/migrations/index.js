const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

// 🔧 Load environment variables
require("dotenv").config();

// ✅ Connect to PostgreSQL via Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// Initialize models
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require("./userTable")(sequelize, DataTypes);
db.Service = require("./serviceTable")(sequelize, DataTypes);

// Define associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export everything
module.exports = db;
