const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.get('/:userId', userController.getUser, (req, res) => {
  res.status(200).json(res.locals.user);
})

router.put('/:userId/likedImages/remove', userController.handleUnlike, (req, res) => {
  res.status(200).json(res.locals.updatedUser);
})

router.put('/:userId/likedImages', userController.handleLike, (req, res) => {
  res.status(200).json(res.locals.updatedUser);
})


module.exports = router;