const express = require(`express`);
const route = express.Router();

const basePath = process.cwd() + "/src/views";

// Main Route
route.get(`/`, (req, res) => res.sendFile(`${basePath}/main.html`));

// Dashboard Route
route.get(`/dashboard`, (req, res) => res.sendFile(`${basePath}/dashboard.html`));
route.get(`/edit-portofolio`, (req, res) => res.sendFile(`${basePath}/edit-portofolio.html`));

// Inbox Route
route.get(`/inbox`, (req, res) => res.sendFile(`${basePath}/inbox.html`));

// Status 404 Route
route.use((req, res, next) => res.status(404).sendFile(`${basePath}/not-found.html`));

module.exports = route