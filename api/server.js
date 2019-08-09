require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRoutes = require("./routes/userRoutes");

const server = express();

server.use(express.json(), helmet(), cors());

// Route handling
userRoutes(server);

module.exports = server;