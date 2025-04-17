const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000; // Use PORT from .env or fallback to 3000

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api/admin', adminRoutes); // Mount admin routes under /api/admin

// Default route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
