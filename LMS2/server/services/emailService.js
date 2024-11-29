// services/emailService.js
const nodemailer = require('nodemailer');

exports.sendOTP = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fzomato143@gmail.com',
        pass: 'rmeq xarb heku yvdr'
      }
      
    });

    const mailOptions = {
      from: 'fzomato143@gmail.com',
      to: email,
      subject: 'OTP for Login',
      text: `Your OTP is ${otp}`
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send OTP');
  }
};
