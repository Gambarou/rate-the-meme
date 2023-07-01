const express = require('express');

const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.get('/check-session', sessionController.isLoggedIn, (req, res) => {
    if (res.locals.isLoggedIn) {
        res.status(200).json({ loggedIn: true, userId: req.cookies.ssid });
    } else res.status(200).json({ loggedIn: false });
});

router.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
    if (res.locals.isVerified) {
      res.status(200).json({ username: res.locals.username, avatar: res.locals.userAvatar });
    } else {
      res.sendStatus(401);
    }
})

router.post('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true });
    res.clearCookie('ssid', { httpOnly: true });
    res.status(200).json({ loggedOut: true });
  });

router.post('/register', userController.createUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
    res.status(200).json(res.locals.newUser);
})


module.exports = router;