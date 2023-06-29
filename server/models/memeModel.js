const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memeSchema = new Schema({
  imageUrl: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;