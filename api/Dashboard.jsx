
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

router.get('/top-services', async (req, res) => {
  try {
    const data = await prisma.serviceRequest.groupBy({
      by: ['serviceType'],
      _count: {
        serviceType: true,
      },
      orderBy: {
        _count: {
          serviceType: 'desc',
        },
      },
      take: 5,
    });

    const formatted = data.map((item) => ({
      service: item.serviceType,
      count: item._count.serviceType,
    }));

    res.json({ data: formatted });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top services' });
  }
});
// server/routes/dashboard.js
router.get('/revenue-overview', async (req, res) => {
  try {
    const data = await prisma.revenue.groupBy({
      by: ['month'],
      _sum: {
        amount: true,
      },
      orderBy: {
        month: 'asc',
      },
    });

    const formatted = data.map((item) => ({
      month: item.month,
      total: item._sum.amount,
    }));

    res.json({ data: formatted });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch revenue overview' });
  }
});

module.exports = router;
