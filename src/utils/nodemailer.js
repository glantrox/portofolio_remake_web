const nodemailer = require('nodemailer');
const service = require('../data/service');

const transport = nodemailer.createTransport({
    service: `gmail`,
    host: `smtp.gmail.com`,
    port: 587,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
})

module.exports = transport