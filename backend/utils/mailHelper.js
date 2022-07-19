const nodemailer = require("nodemailer");

const sendEmail = (toEmail, title, html) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.AUTH_USER2,
      pass: process.env.AUTH_PASS,
    },
  });

  let mailOptions = {
    from: process.env.AUTH_USER2,
    to: toEmail,
    subject: title,
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
    }

    transporter.close();
  });
};

module.exports = sendEmail;
