const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = process.env;

const postUpdatePassword = async (req, res) => {
  try {
    const userData = req.body;
    const decoded = jwt.verify(userData.token, config.TOKEN_KEY);
    if (decoded) {
      const user = await User.findById(decoded.userId);
      if (user) {
        const encryptedPassword = await bcrypt.hash(userData.password, 10);
        await user.updateOne({
          password: encryptedPassword,
        });

        return res.status(200).send({
          message: "Password updated successfully",
          error: false,
        });
      }
      return res.status(404).send({
        message: "User not found",
        error: true,
      });
    }
    return res.status(400).send({
      message: "Invalid token",
      error: true,
    });
  } catch (err) {
    return res.status(500).send("Something went wrong. Please try again.");
  }
};

module.exports = postUpdatePassword;
