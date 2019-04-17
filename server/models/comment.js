const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  body: String,
  date: { type: Date, default: Date.now },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
