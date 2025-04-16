// server/routes/dashboard.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/users', async (req, res) => {
  try {
    const count = await prisma.user.count();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user count' });
  }
});

router.get('/service-providers', async (req, res) => {
  try {
    const count = await prisma.serviceProvider.count();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch provider count' });
  }
});

router.get('/page-views', async (req, res) => {
  try {
    const views = await prisma.pageView.aggregate({
      _sum: {
        count: true,
      },
    });
    res.json({ views: views._sum.count || 0 });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch page views' });
  }
});

router.get('/new-applications', async (req, res) => {
  try {
    const total = await prisma.application.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)), // last 7 days
        },
      },
    });
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch new applications' });
  }
});

module.exports = router;
