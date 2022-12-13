const express = require("express");
const routes = express.Router();
const ytdlRoutes = require("./ytdl.route.js");

routes.use('/ytdl', ytdlRoutes);

module.exports = routes;