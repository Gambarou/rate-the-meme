const User = require('../models/userModel');

const cookierController = {};

cookierController.setSSIDCookie = async (req, res, next) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({email});

      if (!user) {
        return res.redirect('/api');
      }

      res.locals.ssid = user._id;
      res.cookie('ssid', user._id, { httpOnly: true });

      return next();
    } catch (err) {
      return next(err);
    }
}

module.exports = cookierController;