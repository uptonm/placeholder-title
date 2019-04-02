const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const User = mongoose.model('User');

exports.getPost = async (req, res) => {
  let response;
  if (req.params.id) {
    response = await Post.findById(req.params.id).populate({ path: 'author', select: ['email', 'first', 'last'] });
  } else {
    response = await Post.find({}).populate({ path: 'author', select: ['email', 'first', 'last'] });
  }

  if (!response || response.length === 0) {
    return res.status(404).send({
      Error: {
        status: 404,
        message: `${req.params.id ? 'Post not found' : 'No posts were found'}`
      }
    });
  }
  return res.send(response);
};

exports.postPost = async (req, res) => {
  // verify user still exists
  const exists = await User.findById(req.user._id);
  if (!exists || exists.length === 0) {
    return res.status(404).send({
      Error: {
        status: 404,
        message: 'Author not found'
      }
    });
  }
  // check response fields for valid model
  let response = await new Post({ author: req.user._id, ...req.body }).save();
  // create and save post response

  // append post id to user's posts array
  exists.posts.push(response._id);
  await exists.save();

  res.send(response);
};

validatePost = post => {
  let errors = [];

  // Validate required fields

  // Validate author exists
};
