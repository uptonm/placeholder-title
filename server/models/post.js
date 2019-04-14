const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  body: String,
  type: String, // Either 'Original' or 'Repost'
  date: { type: Date, default: Date.now },
  reposts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  poster: { // Either then original poster or the reposter
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
