const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const nodemailer = require('nodemailer');

const sendEmails = async (req, res) => {
  const { to, subject, message, userId } = req.body;

  try {
    // 1. Send the email (using nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or another service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message,
    });

    // 2. Save email metadata to the database
    const email = await prisma.email.create({
      data: {
        to,
        subject,
        message,
        userId: userId || null,
      },
    });

    res.status(200).json({ success: true, email });
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
};

module.exports = {
  saveEmailConfig,
  getEmailConfig,
  getUsers,
  getEmailTemplates,
  sendEmails,
};
