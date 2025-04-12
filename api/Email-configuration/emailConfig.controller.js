const { PrismaClient } = require('@prisma/client');
const { encrypt, decrypt } = require('./encryption.util');
const prisma = new PrismaClient();

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