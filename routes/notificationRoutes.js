const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all notifications (history)
exports.getAllNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch notifications.' });
  }
};

// Get unread notifications (badge/dropdown)
exports.getUnreadNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await prisma.notification.findMany({
      where: { userId, isRead: false },
      orderBy: { createdAt: 'desc' },
    });
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch unread notifications.' });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
    res.json({ message: 'Notification marked as read.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to mark notification as read.' });
  }
};

// Create notification (admin)
exports.createNotification = async (req, res) => {
  try {
    const { userId, title, message } = req.body;
    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        isRead: false,
      },
    });
    res.status(201).json(notification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create notification.' });
  }
};
