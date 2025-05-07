// database/prisma.js
require('dotenv').config(); // ✅ Load environment variables first
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = prisma;
