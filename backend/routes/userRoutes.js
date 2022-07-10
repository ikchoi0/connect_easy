const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/user');

router.patch('/edit', auth(['consultant']), async (req, res) => {
  const { imageUrl } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  user.options.profilePicture = imageUrl;
  await user.save();

  return res.send(user);
});

router.get('/profile', auth(['consultant']), async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  return res.send(user);
});

module.exports = router;
