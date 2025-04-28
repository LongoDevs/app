const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ Get all notifications for a user
exports.getAllNotifications = async (req, res) => {
  try {
    const userId = req.user?.id; // Use optional chaining
    if (!userId) {
      return res.status(400).json({ error: 'User ID not found in request.' });
    }
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(notifications);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ error: 'Failed to fetch notifications.' });
  }
};

// ✅ Get only unread notifications
exports.getUnreadNotifications = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: 'User ID not found in request.' });
    }
    const unreadNotifications = await prisma.notification.findMany({
      where: { userId, isRead: false },
      orderBy: { createdAt: 'desc' },
    });
    res.json(unreadNotifications);
  } catch (err) {
    console.error('Error fetching unread notifications:', err);
    res.status(500).json({ error: 'Failed to fetch unread notifications.' });
  }
};

// ✅ Mark a single notification as read
exports.markAsRead = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(400).json({ error: 'Notification ID is missing.' });
    }
    const updatedNotification = await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
    res.json({ message: 'Notification marked as read.', updatedNotification });
  } catch (err) {
    console.error('Error marking notification as read:', err);
    res.status(500).json({ error: 'Failed to mark notification as read.' });
  }
};

// ✅ Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const { userId, title, message } = req.body;
    if (!userId || !title || !message) {
      return res.status(400).json({ error: 'Missing fields in request body.' });
    }
    const newNotification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        isRead: false,
      },
    });
    res.status(201).json(newNotification);
  } catch (err) {
    console.error('Error creating notification:', err);
    res.status(500).json({ error: 'Failed to create notification.' });
  }
};
