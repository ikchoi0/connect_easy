const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postResetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      return res.status(200).send("Password reset link sent to your email.");
      // send email with reset link
    }

    return res.status(400).send("Email not found in our database.");
  } catch (err) {
    return res.status(500).send("Something went wrong. Please try again.");
  }
};

module.exports = postResetPassword;
