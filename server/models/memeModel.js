const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memeSchema = new Schema({
  img: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, default: 'Unknown' }
});

module.exports = mongoose.model('Meme', memeSchema);