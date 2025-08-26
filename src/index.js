const express = require('express');
const dotenv = require('dotenv'); // Load environment variables from .env file
dotenv.config();
const app = express();
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Octodock API' });
});
// Graceful shutdown helper
function shutdown(server) {
  return new Promise((resolve) => {
    server.close((err) => {
      if (err) {
        console.error('Error shutting down the server:', err);
        process.exit(1);
      }
      console.log('Server closed');
      resolve();
    });
  });
}
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = { app, server, shutdown };
