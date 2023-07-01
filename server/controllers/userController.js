const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');

const userController = {};

userController.getUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ _id: userId });

    res.locals.user = user;
    return next();

  } catch (err) {
    return next(err);
  }
}

userController.handleUnlike = async (req, res, next) => {
  const { userId } = req.params;
  const { memeId } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { likedImages: memeId }},
      { new: true }
    )

    res.locals.updatedUser = updatedUser;
    return next();
    
  } catch (err) {
    return next(err);
  }
}

userController.handleLike = async (req, res, next) => {
  const { userId } = req.params;
  const { memeId } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { likedImages: memeId }},
      { new: true }
    )

    res.locals.updatedUser = updatedUser;
    return next();
    
  } catch (err) {
    return next(err);
  }
}

userController.createUser = async (req, res, next) => {
  const avatarFilenames = fs.readdirSync(path.resolve(__dirname, '../../public/images'));
  const randIdx = Math.floor(Math.random() * avatarFilenames.length);
  const avatarFilename = avatarFilenames[randIdx];
  const avatarPath = `/images/${avatarFilename}`;

  try {
    const { email, username, password } = req.body;
    
    const exisitingUser = await User.findOne({ email });
    
    if (exisitingUser) {
      return res.status(422).json({ error: 'Email already taken'});
    }
    
    const newUser = await User.create({ avatar: avatarPath, email, username, password });
    
    res.locals.newUser = newUser;

    if (!newUser) {
      return res.status(500).json({ err: 'Error creating user' })
    } else return next();

  } catch (err) {
    return next(`Error in userController.createUser: ${err}`);
  }
}

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  res.locals.username = username;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.locals.isVerified = false;
      return next();
    }

    const isMatch = await User.comparePassword(password, user.password);


    if (!isMatch) {
      res.locals.isVerified = false;
    } else  {
      res.locals.isVerified = true;
      res.locals.userAvatar = user.avatar;
    }
      

    return next();
  } catch (err) {
    return next(err);
  }

}

module.exports = userController;