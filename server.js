// server.js
const dotenv = require('dotenv');
const app = require('./app'); // ✅ Import your app

dotenv.config();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
