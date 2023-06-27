const User = require('../models/userModel');

const cookierController = {};

cookierController.setSSIDCookie = async (req, res, next) => {
    const { username } = req.body;

    try {
      const user = await User.findOne({ username });

      res.locals.ssid = user._id;
      res.cookie('ssid', user._id, { httpOnly: true });

      return next();
    } catch (err) {
      return next(err);
    }
}

module.exports = cookierController;