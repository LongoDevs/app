const express = require('express');
const {
  saveEmailConfig,
  getEmailConfig,
  sendEmails
} = require('./emailConfig.controller');

const router = express.Router();

router.post('/email-config', saveEmailConfig);
router.get('/email-config', getEmailConfig);
router.post('/send-email', sendEmails);

module.exports = router;
