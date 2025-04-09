const express = require("express");
const JobController = require("./controller");

const router = express.Router();

// Job Routes
router.post("/jobs", JobController.createJob);
router.get("/jobs", JobController.getAllJobs);
router.put("/jobs/:jobId/close", JobController.closeJob);

// Bidding Routes
router.post("/bids", JobController.placeBid);
router.get("/jobs/:jobId/bids", JobController.getBids);

module.exports = router;
