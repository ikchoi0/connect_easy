const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");
const Category = require("../models/category");
const Types = require("mongoose").Types;

router.patch("/edit", auth(["consultant"]), async (req, res) => {
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

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).send("User not found");
  }

  // remove current user from old category
  const oldCategory = await Category.findOne({
    users: { _id: Types.ObjectId(user._id) },
  });

  const filteredUsers = oldCategory.users.filter(
    (id) => id.toString() !== user._id.toString()
  );
  await oldCategory.updateOne({
    users: filteredUsers,
  });

  // update category if user not in new category
  const category = await Category.findOne({
    _id: Types.ObjectId(selectedCategory),
    users: { _id: Types.ObjectId(user._id) },
  }).populate("users");

  if (!category) {
    const newCategory = await Category.findOne({
      _id: Types.ObjectId(selectedCategory),
    });

    newCategory.users.push(user._id);
    await newCategory.save();
  }

  // update user
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.category = Types.ObjectId(selectedCategory);
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

router.get("/profile", auth(["consultant"]), async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  const category = await Category.findOne({
    users: { _id: Types.ObjectId(user._id) },
  });

  if (!user || !category) {
    return res.status(404).send("User or category not found");
  }

  return res.send({ user, categoryId: category._id });
});

module.exports = router;
