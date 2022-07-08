const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postRegister = async (req, res) => {
  try {
    console.log('register controller');
    // the user is sending their username, password, and mail
    const { firstName, lastName, password, email, consultantCheck } = req.body;

    // check if user exists
    const userExists = await User.exists({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(409).send('E-mail already in use.');
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user document and save in the database
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      role: consultantCheck ? 'consultant' : 'client',
    });

    // create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: '24h',
      }
    );

    // send the response to the client
    res.status(201).json({
      userDetails: {
        email: user.email,
        token: token,
        userId: user._id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    return res.status(500).send('Error occured. Please try again.');
  }
};

module.exports = postRegister;
