const bcrypt = require('bcrypt');
const User = require('../models/user');

async function signUp(req, res, next) {
  try {
    // Extract user data from request body
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Send success response
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signUp
};
