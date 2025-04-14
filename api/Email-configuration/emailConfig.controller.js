const fs = require('fs');
const path = require('path');
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

// List all users
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Fetch email templates from JSON file
const getEmailTemplates = (req, res) => {
  try {
    const templatesPath = path.join(__dirname, 'emailTemplates.json');
    const templates = JSON.parse(fs.readFileSync(templatesPath, 'utf-8'));
    const simplified = templates.map(t => ({ key: t.key, subject: t.subject }));
    res.status(200).json(simplified);
  } catch (err) {
    console.error('Read templates error:', err);
    res.status(500).json({ error: 'Failed to read email templates' });
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

    const templatesPath = path.join(__dirname, 'emailTemplates.json');
    const templates = JSON.parse(fs.readFileSync(templatesPath, 'utf-8'));
    const template = templates.find(t => t.key === templateKey);

    if (!template) return res.status(404).json({ error: 'Email template not found' });

    for (const user of users) {
      const personalizedBody = template.body.replace('{{name}}', user.name);
      await sendEmail(user.email, template.subject, personalizedBody);
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
  getUsers,
  getEmailTemplates,
  sendEmails
};
