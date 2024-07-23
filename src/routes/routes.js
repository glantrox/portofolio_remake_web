const express = require(`express`);
const route = express.Router();

// Middleware
const middleWare = require(`./middleware.js`)

const basePath = process.cwd() + "/src/views";

const assetpath = process.cwd() + "/assets"

// Main Route
route.get(`/`, (req, res) => res.sendFile(`${basePath}/main.html`));

// CV Route
route.get(`/cv-resume`, (req, res) => res.sendFile(`${assetpath}/cv-hamas-azizan.pdf`));

// Dashboard Route
route.get(`/dashboard`, middleWare.authMiddleware ,(req, res) => res.sendFile(`${basePath}/dashboard.html`));

// Edit Route
route.get(`/edit-portofolio`, middleWare.authMiddleware, (req, res) => res.sendFile(`${basePath}/edit-portofolio.html`));

// Inbox Route
route.get(`/inbox`, middleWare.authMiddleware, (req, res) => res.sendFile(`${basePath}/inbox.html`));

// Login Route
route.get(`/login`, (req, res) => res.sendFile(`${basePath}/auth-screen.html`));

// Status 404 Route
route.use((req, res, next) => res.status(404).sendFile(`${basePath}/not-found.html`));

module.exports = route