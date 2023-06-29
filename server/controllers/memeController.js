const Meme = require('../models/memeModel');

const memeController = {};

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
  const { imageUrl } = req.body;

  try {
    const newMeme = await Meme.create({ imageUrl });
    res.locals.meme = newMeme;
    console.log(newMeme);
    return next()

  } catch (err) {
    return next(`Error in memeController.createMeme: ${err}`);
  }
};

module.exports = memeController;