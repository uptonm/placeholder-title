const mongoose = require('mongoose');
// const Comment = mongoose.model('Comment');
// const User = mongoose.model('User');
const Post = mongoose.model('Post');
// Get all comments from a post
exports.getPostComments = async (req, res) => {
  // Check that post exists
  const { postId } = req.params;
  const exists = await Post.findById(postId).populate('Comment');
  if (exists) {
    return res.status(200).send(exists.comments);
  } else {
    return res.status(404).send({
      Error: {
        status: 404,
        message: 'No comments'
      }
    });
  }
  // Populate the documents from the post parameter
};
// Get all comments from a user
// Add a comment
// Edit a comment
// Delete a comment
