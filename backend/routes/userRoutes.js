const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/user');
const Category = require('../models/category');
const Types = require('mongoose').Types;

router.patch('/edit', auth(['consultant']), async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    description,
    street,
    city,
    state,
    country,
    postalCode,
    price,
    selectedCategory,
    imageUrl,
  } = req.body;

  console.log(req.body);

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  // remove current user from old category
  const oldCategory = await Category.findOne({ users: user._id });
  console.log(oldCategory);
  const filteredUsers = oldCategory.users.filter(
    (id) => id.toString() !== user._id.toString()
  );
  console.log('oldCategory', filteredUsers);
  oldCategory.users = filteredUsers;
  await oldCategory.save();

  // update category
  const category = await Category.findOne({
    _id: Types.ObjectId(selectedCategory),
  });
  console.log('update category', category);
  category.users.push(user._id);
  await category.save();
  //

  /**
   *
   * CATEGORY ISSUE
   */

  // update user
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.options.description = description;
  user.options.street = street;
  user.options.city = city;
  user.options.state = state;
  user.options.country = country;
  user.options.postalCode = postalCode;
  user.options.price = price;
  user.options.profilePicture = imageUrl
    ? imageUrl
    : user.options.profilePicture;
  await user.save();

  return res.send({ user });
});

router.get('/profile', auth(['consultant']), async (req, res) => {
  console.log(req.user);
  const user = await User.findById(req.user._id).select('-password');
  console.log(user);

  const category = await Category.findOne({ users: req.user.id });

  if (!user || !category) {
    return res.status(404).send('User or category not found');
  }

  return res.send({ user, categoryId: category.id });
});

module.exports = router;
