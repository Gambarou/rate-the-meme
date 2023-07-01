const Meme = require('../models/memeModel');

const memeController = {};

memeController.handleUnlike = async (req, res, next) => {
  const { memeId } = req.params;
  const { userId } = req.body;

  try {
    const updatedMeme = await Meme.findByIdAndUpdate(
      memeId,
      { $pull: { likes: userId }},
      { new: true }
    )

    res.locals.updatedMeme = updatedMeme;
    return next();

  } catch (err) {
    return next(err);
  }
}

memeController.handleLike = async (req, res, next) => {
  const { memeId } = req.params;
  const { userId } = req.body;

  try {
    const updatedMeme = await Meme.findByIdAndUpdate(
      memeId,
      { $addToSet: { likes: userId }},
      { new: true }
    )

    res.locals.updatedMeme = updatedMeme;
    return next();

  } catch (err) {
    return next(err);
  }
}

memeController.uploadMessage = async (req, res, next) => {
  const { _id, message, username, avatar } = req.body

  try {
    const updatedMessages = await Meme.findByIdAndUpdate(
      _id, 
      { $addToSet: { comments: {
        text: message,
        username,
        avatar,
      } }},
      { new: true }
    )

    res.locals.updatedMessages = updatedMessages;
  
    return next();
  } catch (err) {
    return next(err);
  }
}

memeController.getMemes = async (req, res, next) => {
  try {
    const memes = await Meme.find({});
    res.locals.memes = memes;
    return next();
  } catch (err) {
    return next(err);
  }
};

memeController.createMeme = async (req, res, next) => {
  const { imageUrl, userId, username, avatar } = req.body;

  try {
    const newMeme = await Meme.create({ imageUrl, user: userId, username, avatar });
    res.locals.meme = newMeme;
    return next()

  } catch (err) {
    return next(`Error in memeController.createMeme: ${err}`);
  }
};

module.exports = memeController;