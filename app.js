const express = require("express");
const cors = require("cors");

// Route imports
const emailRoutes = require("./emailConfiguration/emailConfig.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Register routes
app.use("/api/email-configuration", emailRoutes);
app.use("/api/auth", require("./api/auth/routes"));
app.use("/api/admin", require("./api/admin/routes"));
app.use("/api/bidding", require("./api/bidding/routes"));
app.use("/api/gamification", require("./api/gamification/routes"));
app.use("/api/geolocation", require("./api/geolocation/routes"));
app.use("/api/notifications", require("./api/notifications/routes"));
app.use("/api/service-requesting", require("./api/serviceRequesting/routes"));

module.exports = app;
