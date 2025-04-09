const express = require("express");
const NotificationController = require("./controller");

const router = express.Router();

router.post("/notifications", NotificationController.sendNotification);
router.get("/notifications/:userId", NotificationController.getUserNotifications);
router.put("/notifications/read/:notificationId", NotificationController.markNotificationAsRead);

module.exports = router;
