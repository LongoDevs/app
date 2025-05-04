// Dummy controller for bidding

// GET all bids (dummy data for now)
exports.getAllBids = (req, res) => {
  res.json([
    { id: 1, item: 'Antique Vase', amount: 500 },
    { id: 2, item: 'Painting', amount: 1200 }
  ]);
};

// POST a new bid
exports.placeBid = (req, res) => {
  const { item, amount } = req.body;

  if (!item || !amount) {
    return res.status(400).json({ message: 'Item and amount are required.' });
  }

  // Dummy response
  res.status(201).json({
    message: 'Bid placed successfully!',
    data: { item, amount }
  });
};
