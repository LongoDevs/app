const express = require('express');
const emailRoutes = require('./emailConfiguration/emailConfig.routes');

const app = express();
app.use(express.json());

app.use('/api/Email-configuration', emailRoutes);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Import and register routes
app.use("/api/auth", require("./api/auth/routes"));
app.use("/api/admin", require("./api/admin/routes"));
app.use("/api/bidding", require("./api/bidding/routes"));
app.use("/api/gamification", require("./api/gamification/routes"));
app.use("/api/geolocation", require("./api/geolocation/routes"));
app.use("/api/notifications", require("./api/notifications/routes"));
app.use("/api/service-requesting", require("./api/serviceRequesting/routes"));

// Export app for server.js
module.exports = app;
