const express = require("express");
const ServiceRequestController = require("./controller");

const router = express.Router();

router.post("/service-requests", ServiceRequestController.createRequest);
router.get("/service-requests", ServiceRequestController.getRequests);
router.put("/service-requests/:id", ServiceRequestController.updateRequest);
router.delete("/service-requests/:id", ServiceRequestController.deleteRequest);

module.exports = router;
