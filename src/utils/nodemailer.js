const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: `gmail`,
    host: `smtp.gmail.com`,
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
})

module.exports = transport