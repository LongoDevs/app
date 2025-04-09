const NotificationService = require("./service");

class NotificationController {
  async sendNotification(req, res) {
    try {
      const { userId, message, type } = req.body;
      const notification = await NotificationService.createNotification(userId, message, type);
      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserNotifications(req, res) {
    try {
      const { userId } = req.params;
      const notifications = await NotificationService.getUserNotifications(userId);
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async markNotificationAsRead(req, res) {
    try {
      const { notificationId } = req.params;
      await NotificationService.markAsRead(notificationId);
      res.status(200).json({ message: "Notification marked as read" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new NotificationController();
