const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;  // Setting the port dynamically

// Middleware
app.use(cors());  // Enabling Cross-Origin Resource Sharing (CORS)
app.use(express.json());  // Enabling JSON body parsing

// Routes
// You might want to define some routes here, for example:
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
