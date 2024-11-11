const nodemailer = require('nodemailer');

const sendResetEmail = async (to, resetToken) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email provider
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  const resetLink = `http://localhost:${process.env.PORT}/reset-password/${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Password Reset',
    text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };
