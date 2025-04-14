const prisma = require('../../prismaClient');
const { sendEmail } = require('./mailService');

// Save or update SMTP config
const saveEmailConfig = async (req, res) => {
  try {
    const { host, port, secure, user, pass } = req.body;

    const existing = await prisma.emailConfig.findFirst();
    if (existing) {
      await prisma.emailConfig.update({
        where: { id: existing.id },
        data: { host, port: +port, secure, user, pass }
      });
    } else {
      await prisma.emailConfig.create({
        data: { host, port: +port, secure, user, pass }
      });
    }

    res.status(200).json({ message: 'Email configuration saved' });
  } catch (err) {
    console.error('Save config error:', err);
    res.status(500).json({ error: 'Failed to save email configuration' });
  }
};

// Get current SMTP config
const getEmailConfig = async (req, res) => {
  try {
    const config = await prisma.emailConfig.findFirst();
    if (!config) return res.status(404).json({ error: 'No config found' });
    res.status(200).json(config);
  } catch (err) {
    console.error('Get config error:', err);
    res.status(500).json({ error: 'Failed to retrieve email configuration' });
  }
};

// Send emails to selected users
const sendEmails = async (req, res) => {
  try {
    const { target, userIds, templateKey } = req.body;

    let users = [];
    if (target === 'all') {
      users = await prisma.user.findMany();
    } else if (target === 'providers') {
      users = await prisma.user.findMany({ where: { role: 'SERVICE_PROVIDER' } });
    } else if (target === 'selected' && userIds?.length) {
      users = await prisma.user.findMany({ where: { id: { in: userIds } } });
    }

    if (!users.length) return res.status(400).json({ error: 'No recipients found' });

    const template = await prisma.emailTemplate.findUnique({ where: { key: templateKey } });
    if (!template) return res.status(404).json({ error: 'Email template not found' });

    for (const user of users) {
      await sendEmail(user.email, template.subject, template.body);
    }

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (err) {
    console.error('Send emails error:', err);
    res.status(500).json({ error: 'Failed to send emails' });
  }
};

module.exports = {
  saveEmailConfig,
  getEmailConfig,
  sendEmails
};
