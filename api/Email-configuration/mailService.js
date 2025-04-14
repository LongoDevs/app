const nodemailer = require('nodemailer');
const prisma = require('../../prismaClient');

let transporter;

const setupTransporter = async () => {
  const config = await prisma.emailConfig.findFirst();
  if (!config) throw new Error('SMTP configuration not found');

  transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass
    }
  });
};

const sendEmail = async (to, subject, message) => {
  if (!transporter) await setupTransporter();

  const options = {
    from: (await prisma.emailConfig.findFirst()).user,
    to,
    subject,
    text: message
  };

  return transporter.sendMail(options);
};

module.exports = {
  sendEmail
};
