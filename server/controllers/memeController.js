const Meme = require('../models/memeModel');

const memeController = {};

memeController.createMeme = async (req, res, next) => {
  try {
    await axios.post()
  } catch (err) {
    return next(`Error in memeController.createMeme: ${err}`);
  }
}

module.exports = memeController;