require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRoutes = require("../routes/userRoutes");
const eventRoutes = require("../routes/eventRoutes");
const scheduleRoutes = require("../routes/scheduleRoutes");
const ticketRoutes = require("../routes/ticketRoutes");
const salesRoutes = require("../routes/salesRoutes");
const smsRoutes = require("../routes/smsRoutes");
const server = express();

server.use(express.json(), helmet(), cors());

// Sanity Check
server.get("/", (req, res) => {
	res.status(200).json({ api: "up" });
});

server.get("/api", (req, res) => {
	res.send(`<center><h1>Welcome to the Social Tours API</h1></center>`);
});

// Route handling
server.use("/api/events", eventRoutes);
server.use("/api/schedules", scheduleRoutes);
server.use("/api/tickets", ticketRoutes);
server.use("/api/sales", salesRoutes);
server.use("/sms", smsRoutes);
userRoutes(server);

module.exports = server;
