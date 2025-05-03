const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createNotification = async (req, res) => {
  const { userId, title, message } = req.body;
  const notification = await prisma.notification.create({
    data: { userId, title, message },
  });
  res.status(201).json(notification);
};

const getUnreadNotifications = async (req, res) => {
  const notifications = await prisma.notification.findMany({
    where: { userId: req.user.id, isRead: false },
    orderBy: { createdAt: 'desc' },
  });
  res.json(notifications);
};

const getAllNotifications = async (req, res) => {
  const notifications = await prisma.notification.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' },
  });
  res.json(notifications);
};

const markNotificationAsRead = async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });
  res.json({ message: 'Marked as read.' });
};

// ✅ Correct export
module.exports = {
  createNotification,
  getUnreadNotifications,
  getAllNotifications,
  markNotificationAsRead,
};
