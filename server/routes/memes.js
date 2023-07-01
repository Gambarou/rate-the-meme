const express = require('express');

const memeController = require('../controllers/memeController');

const router = express.Router();

router.get('/', memeController.getMemes, (req, res) => {
  res.status(200).json(res.locals.memes);
});

router.post('/', memeController.createMeme, (req, res) => {
  res.status(200).json(res.locals.meme);
});

router.post('/messages', memeController.uploadMessage, (req, res) => {
  res.status(200).json(res.locals.updatedMessages);
})

router.post('/:memeId/like', memeController.handleLike, (req, res) => {
  res.status(200).json(res.locals.updatedMeme);
});

router.post('/:memeId/unlike', memeController.handleUnlike, (req, res) => {
  res.status(200).json(res.locals.updatedMeme);
});

module.exports = router;