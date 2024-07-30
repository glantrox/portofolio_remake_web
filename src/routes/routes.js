const express = require(`express`);
const route = express.Router();

const basePath = process.cwd() + "/src/views";
const assetpath = process.cwd() + "/assets"

// Main Route
route.get(`/`, (req, res) => res.sendFile(`${basePath}/main.html`));

// Route Front-end Development
route.get(`/backend-development`, (req, res) => res.sendFile(`${basePath}/info-frontend.html`));

// Route Back-end Development
route.get(`/frontend-development`, (req, res) => res.sendFile(`${basePath}/info-backend.html`));

// CV Route
route.get(`/cv-resume`, (req, res) => res.sendFile(`${assetpath}/cv-hamas-azizan.pdf`));

// Login Route
route.get(`/login`, (req, res) => res.sendFile(`${basePath}/auth-screen.html`));

// Status 404 Route
route.use((req, res, next) => res.status(404).sendFile(`${basePath}/not-found.html`));

module.exports = route