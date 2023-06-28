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
        res.locals.loggedIn = false;
        return next();
      }

      try{
        jwt.verify(token, process.env.TOKEN_KEY);
        res.locals.isLoggedIn = true;
      } catch (err) {
        console.log(`Token verification failed: ${err.message}`);
        res.locals.isLoggedIn = false;
      }

      // const isVerified = jwt.verify(token, process.env.TOKEN_KEY);
      // console.log(isVerified);

      // if (isVerified){
      //   res.locals.isLoggedIn = true;
      // } else res.locals.isLoggedIn = false;

      return next();
      
    } catch (err) {
        console.log(`Error: ${err}`);
        return next(err);
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