const User = require("../../models/user");

const getUserMeetingStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.status(200).json({ userDetails: user });
  } catch (err) {
    return res.status(500).send("Something went wrong. Please try again.");
  }
};

module.exports = getUserMeetingStatus;
