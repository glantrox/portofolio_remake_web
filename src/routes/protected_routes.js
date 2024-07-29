const express = require(`express`)
const protectedRoutes = express.Router()

// BasePath
const basePath = process.cwd() + "/src/views";

// Middleware
const middleWare = require(`./middleware`)

protectedRoutes.use( middleWare.checkAuth)

// Dashboard Route
protectedRoutes.get(`/dashboard`, (req, res) => res.sendFile(`${basePath}/dashboard.html`));

// Edit Route
protectedRoutes.get(`/edit-portofolio`, (req, res) => res.sendFile(`${basePath}/edit-portofolio.html`));

// Inbox Route
protectedRoutes.get(`/inbox`, (req, res) => res.sendFile(`${basePath}/inbox.html`));

module.exports = protectedRoutes