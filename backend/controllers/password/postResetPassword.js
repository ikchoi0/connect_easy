const User = require("../../models/user");
const sendEmail = require("../../utils/mailHelper");
const RESET_PAGE = "http://localhost:3000/password/";
const jwt = require("jsonwebtoken");

const postResetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.TOKEN_KEY,
        {
          //change this to 10m later
          expiresIn: "24h",
        }
      );
      const params = email + "/" + token;
      const restLink = RESET_PAGE + params;
      sendEmail(
        user.email,
        "Reset Password from Connect Easy",
        'Please follow this link to reset your password <a href="' +
          restLink +
          '">' +
          "Reset password link" +
          "</a>"
      );
      return res.status(200).send("Password reset link sent to your email.");
      // send email with reset link
    }

    return res.status(400).send("Email not found in our database.");
  } catch (err) {
    return res.status(500).send("Something went wrong. Please try again.");
  }
};

module.exports = postResetPassword;
