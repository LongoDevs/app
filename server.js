const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/adminRoutes');
dotenv.config();

const adminRoutes = require('./routes/adminRoutes');
const gamificationRoutes = require('./routes/gamificationRoutes');

const app = express();
const port = process.env.PORT || 3000;

const notificationRoutes = require('./routes/notificationRoutes');
app.use('/api', notificationRoutes);

app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/gamification', gamificationRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

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

const gamificationRoutes = require('./routes/gamificationRoutes');
app.use('/api/gamification', gamificationRoutes);

