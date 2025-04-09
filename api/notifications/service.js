const Notification = require("./model");

class NotificationService {
  async createNotification(userId, message, type) {
    return await Notification.create({ userId, message, type });
  }

  async getUserNotifications(userId) {
    return await Notification.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
  }

  async markAsRead(notificationId) {
    return await Notification.update({ isRead: true }, { where: { id: notificationId } });
  }
}

module.exports = new NotificationService();
