const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const config = process.env;

const getResetPassword = async (req, res) => {
  const { email, token } = req.params;
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    const user = await User.findById(decoded.userId);
    if (decoded && email === user.email) {
      return res.status(200).send({
        message: "Token is valid",
        error: false,
      });
    }
    return res
      .status(403)
      .send("you are not authorized to access this resource");
  } catch (err) {
    return res.status(500).send("Something went wrong. Please try again.");
  }
};
module.exports = getResetPassword;
