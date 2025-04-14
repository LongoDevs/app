const { PrismaClient } = require('@prisma/client');
const { encrypt, decrypt } = require('./encryption.util');
const { sendEmail } = require('./mailService');

const prisma = new PrismaClient();

// Save SMTP Configuration
exports.saveEmailConfig = async (req, res) => {
  const { host, port, secure, user, pass } = req.body;
  const encryptedPass = encrypt(pass);
  try {
    await prisma.emailConfig.upsert({
      where: { id: 1 },
      update: { host, port, secure, user, pass: encryptedPass },
      create: { host, port, secure, user, pass: encryptedPass },
    });
    res.json({ message: 'SMTP config saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving config' });
  }
};

// Get SMTP Configuration
exports.getEmailConfig = async (req, res) => {
  try {
    const config = await prisma.emailConfig.findUnique({ where: { id: 1 } });
    if (!config) return res.status(404).json({ error: 'No config found' });
    const decryptedPass = decrypt(config.pass);
    res.json({ ...config, pass: decryptedPass });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching config' });
  }
};

// Send Test Email
exports.sendTestEmail = async (req, res) => {
  const { to } = req.body;
  if (!to) return res.status(400).json({ error: 'Recipient email is required' });

  try {
    await sendEmail(to, 'SMTP Test Email', `<p>This is a test email from your app.</p>`);
    res.json({ message: 'Test email sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send test email' });
  }
};
