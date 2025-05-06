const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize app and port
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
 app.use('/api/admin', require('./routes/adminRoutes'));
 //app.use('/api/notifications', require('./routes/notificationRoutes'));
 app.use('/api/gamification', require('./routes/gamificationRoutes'));

// Default route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
