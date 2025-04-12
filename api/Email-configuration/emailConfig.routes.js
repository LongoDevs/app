const express = require('express');
const router = express.Router();
const controller = require('./emailConfig.controller');

router.post('/api/admin/email-config', controller.saveEmailConfig);
router.get('/api/admin/email-config', controller.getEmailConfig);

module.exports = router;