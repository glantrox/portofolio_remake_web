// nodemon app.js
const express = require(`express`);
const app = express();

// PORT Handling
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`========================================\n`);
    console.log(`Server is running on port ${PORT}\n`);
    console.log(`Heres the link http://localhost:${PORT}\n`);
    console.log(`========================================\n`);
});

// Static Path for Assets
app.use('/assets', express.static(__dirname + `/assets`));
app.use('/script', express.static(__dirname + `/src/script`));
app.use('/style', express.static(__dirname + `/src/style`));
app.use(`/uploads`, express.static(__dirname + `/uploads`));

// Service
const service = require(`./src/data/remote_data_soure`);
app.use(`/service`, service);

// Routes
const basePath = `${__dirname}/src/views`;
app.get(`/`, (req, res) => res.sendFile(`${basePath}/main.html`));
app.get(`/dashboard`, (req, res) => res.sendFile(`${basePath}/dashboard.html`));
app.use((req, res, next) => res.status(404).sendFile(`${basePath}/not-found.html`));

