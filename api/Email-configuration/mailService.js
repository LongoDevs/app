// mailService.js
const nodemailer = require('nodemailer');
const { PrismaClient } = require('@prisma/client');
const { decrypt } = require('./encryption.util');

const prisma = new PrismaClient();

const createTransporter = async () => {
  const config = await prisma.emailConfig.findUnique({ where: { id: 1 } });
  if (!config) throw new Error('SMTP configuration not found');

  const decryptedPass = decrypt(config.pass);

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: decryptedPass,
    },
  });
};

exports.sendEmail = async (to, subject, html) => {
  const transporter = await createTransporter();

  const mailOptions = {
    from: '"Admin" <no-reply@yourapp.com>',
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};
