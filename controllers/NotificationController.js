// Get unread notifications for badge/dropdown
exports.getUnreadNotifications = async (req, res) => {
  const notifications = await prisma.notification.findMany({
    where: { userId: req.user.id, isRead: false },
    orderBy: { createdAt: 'desc' },
  });
  res.json(notifications);
};

// Get all notification history
exports.getAllNotifications = async (req, res) => {
  const notifications = await prisma.notification.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' },
  });
  res.json(notifications);
};

// Admin creates a notification
exports.createNotification = async (req, res) => {
  const { userId, title, message } = req.body;
  const notification = await prisma.notification.create({
    data: { userId, title, message },
  });
  res.status(201).json(notification);
};

// Mark as read
exports.markNotificationAsRead = async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });
  res.json({ message: 'Marked as read.' });
};
