// emailService.js

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can also use other services like Outlook, Yahoo, etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or App password
    },
});

// Function to send email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
