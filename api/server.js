require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRoutes = require("../routes/userRoutes");
const eventRoutes = require('../routes/eventRoutes');
const scheduleRoutes = require('../routes/scheduleRoutes');
const ticketRoutes = require('../routes/ticketRoutes');
const registerRoutes = require('../routes/registerRoutes');
const loginRoutes = require('../routes/loginRoutes');

const server = express();

server.use(express.json(), helmet(), cors());

// Route handling
server.use('/api/events', eventRoutes);
server.use('/api/schedules', scheduleRoutes);
server.use('/api/tickets', ticketRoutes);
server.use('/api/users', userRoutes);
server.use('/api/register', registerRoutes);
server.use('/api/login', loginRoutes);

module.exports = server;