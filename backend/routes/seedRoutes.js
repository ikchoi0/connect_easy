const express = require('express');
const router = express.Router();
const { ConsultantSeedDB, CategorySeedDB, ClientSeeds } = require('../db/seeds');
const User = require('../models/user');
const Category = require('../models/category');
const Appointment = require('../models/appointment');

router.get('/', async (req, res) => {
  try {
    await User.deleteMany({});
    const userList = await User.insertMany(ConsultantSeedDB);
    // await User.insertMany(ClientSeeds);

    await Category.deleteMany({});
    const categoryList = await Category.insertMany(CategorySeedDB(userList));

    await Appointment.deleteMany({});

    return res.status(200).send({ userList, categoryList });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
