
const express = require('express');
const {
  saveEmailConfig,
  getEmailConfig,
  getUsers,
  getEmailTemplates,
  sendEmails
} = require('./emailConfig.controller');

const router = express.Router();

router.get('/email-config', getEmailConfig);
router.post('/email-config', saveEmailConfig);
router.get('/users', getUsers);
router.get('/email-templates', getEmailTemplates);
router.post('/send-email', sendEmails);

module.exports = router;
