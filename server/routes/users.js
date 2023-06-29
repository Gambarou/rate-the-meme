const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.put('/:userId/likedImages', userController.handleLike, (req, res) => {
    console.log(res.locals.updatedUser)
  res.status(200).json(res.locals.updatedUser);
})

module.exports = router;