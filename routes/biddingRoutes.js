// routes/biddingRoutes.js
import express from 'express';
import { getAllBids, createBid } from '../controllers/biddingController.js';

const router = express.Router();

router.get('/', getAllBids);
router.post('/', createBid);

export default router;
