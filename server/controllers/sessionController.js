const jwt = require('jsonwebtoken');
require('dotenv').config();

const sessionController = {};

sessionController.logout = async (req, res, next) => {
    try {
      res.clearCookie('token');
      return next();
    } catch (err) {
      return next(err);
    }
 }

 sessionController.isLoggedIn = async (req, res, next) => {
    try {
      const { token } = req.cookies;

      if (!token) {
        res.redirect('/');
      }

      jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
          return res.redirect('/');
        }
        return next()
      });
    } catch (err) {
        console.log(`Error: ${err}`);
        return res.redirect('/');
    }
 };

 sessionController.startSession = async (req, res, next) => {
  const { username } = req.body;

  try {
    const token = jwt.sign({ userId: username }, process.env.TOKEN_KEY, {
      expiresIn: '1h',
    })
    res.cookie('token', token, { httpOnly: true, secure: true });

    return next();
  } catch (err) {
    return next(err);
  }
 };

 module.exports = sessionController;