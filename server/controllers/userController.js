const User = require('../models/userModel');

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const exisitingUser = await User.findOne({ email });

    if (exisitingUser) {
      return res.status(422).json({ error: 'Email already taken'});
    }

    const newUser = await User.create({ email, username, password });

    res.locals.newUser = newUser;

    if (!newUser) {
      return res.status(500).json({ error: 'Error creating user' })
    } else return next();

  } catch (err) {
    return next(`Error in userController.createUser: ${err}`);
  }
}

module.exports = userController;