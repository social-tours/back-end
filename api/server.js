require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRoutes = require("../routes/userRoutes");
const eventRoutes = require('../routes/eventRoutes');

const server = express();

server.use(express.json(), helmet(), cors());

// Sanity Check
server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

// Route handling
server.use('/api/events', eventRoutes);
userRoutes(server);

module.exports = server;