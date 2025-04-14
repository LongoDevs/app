const express = require('express');
const emailRoutes = require('./emailConfiguration/emailConfig.routes');

const app = express();
app.use(express.json());

app.use('/api/Email-configuration', emailRoutes);
