const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memeSchema = new Schema({
  imageUrl: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    text: { type: String, required: true },
    username: { type: String, required: true },
    avatar: { type: String, required: true },
    createdAt: { type: Date, default: Date.now}
  }],
  username: { type: String, required: true },
  avatar: { type: String, required: true }
});

const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;