const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get unread notifications for dropdown/badge
exports.getUnreadNotifications = async (req, res) => {
  const userId = req.user.id;
  const notifications = await prisma.notification.findMany({
    where: { userId, isRead: false },
    orderBy: { createdAt: 'desc' },
  });
  res.json(notifications);
};

// Get all notifications history
exports.getAllNotifications = async (req, res) => {
  const userId = req.user.id;
  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  res.json(notifications);
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });
  res.json({ message: 'Notification marked as read.' });
};

// Admin can send a new notification to a user
exports.createNotification = async (req, res) => {
  const { userId, title, message } = req.body;
  const notification = await prisma.notification.create({
    data: { userId, title, message },
  });
  res.status(201).json(notification);
};
