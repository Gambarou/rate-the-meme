const User = require('../models/userModel');

const userController = {};

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
  const avatars = [
     '/Users/peelintaters/Desktop/solo-project/public/images/alien-avatar.svg',
     '/Users/peelintaters/Desktop/solo-project/public/images/animal-avatar.svg',
     '/Users/peelintaters/Desktop/solo-project/public/images/anime-away-face.svg',
     '/Users/peelintaters/Desktop/solo-project/public/images/avatar-avocado.svg',
     '/Users/peelintaters/Desktop/solo-project/public/images/avatar-bad-breaking.svg',
     '/Users/peelintaters/Desktop/solo-project/public/images/avatar-batman.svg',
     '/Users/peelintaters/Desktop/solo-project/public/images/avatar-bug.svg',
     '/Users/peelintaters/Desktop/solo-project/public/images/avatar-cacti.svg',
     '/Users/peelintaters/Desktop/solo-project/public/images/avatar-elderly.svg',
     '/Users/peelintaters/Desktop/solo-project/public/images/avatar-lazybones-sloth.svg',
     '/Users/peelintaters/Desktop/solo-project/public/images/avatar-male-ozzy.svg',
     '/Users/peelintaters/Desktop/solo-project/public/images/fighter-luchador-man-svgrepo-com.svg',
     '/Users/peelintaters/Desktop/solo-project/public/images/friday-halloween-jason-svgrepo-com.svg'
    ]
  const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    console.log(randomAvatar);
  try {
    const { email, username, password } = req.body;

    const exisitingUser = await User.findOne({ email });

    if (exisitingUser) {
      return res.status(422).json({ error: 'Email already taken'});
    }

    const newUser = await User.create({ avatar: randomAvatar, email, username, password });

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

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.locals.isVerified = false;
      return next();
    }

    const isMatch = await User.comparePassword(password, user.password);

    if (!isMatch) {
      res.locals.isVerified = false;
    } else  res.locals.isVerified = true;

    return next();
  } catch (err) {
    return next(err);
  }

}

module.exports = userController;