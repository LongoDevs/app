const nodemailer = require('nodemailer');
const { getEmailConfig } = require('../controller');

let transporter;

const setupTransporter = async () => {
  const config = await getEmailConfig();
  transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
};

const sendEmail = async (to, subject, message) => {
  if (!transporter) await setupTransporter();

  const mailOptions = {
    from: transporter.options.auth.user,
    to,
    subject,
    text: message,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
