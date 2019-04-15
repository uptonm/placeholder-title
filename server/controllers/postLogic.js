const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const User = mongoose.model('User');

exports.getPost = async (req, res) => {
  let response;

  if (req.query.postId) {
    // Gets post by post Id
    response = await Post.findById(req.query.postId).populate({
      path: 'author',
      select: ['email', 'first', 'last']
    });
  } else if (req.query.userId) {
    // Confirm user exists
    const exists = await User.findById(req.query.userId).populate('posts');
    if (exists) {
      response = await exists.posts;
    }
  } else {
    // Gets all posts
    response = await Post.find({}).populate({ path: 'author', select: ['email', 'first', 'last'] });
  }

  if (!response || response.length === 0) {
    return res.status(404).send({
      Error: {
        status: 404,
        message: `${req.query.postId ? 'Post not found' : 'No posts were found'}`
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
  if (!req.body.title || !req.body.body) {
    const missingTitle = req.body.title ? '' : 'Error: post title is missing ';
    const missingBody = req.body.body ? '' : 'Error: post body is missing';

    return res.status(404).send({
      Error: {
        status: 404,
        message: missingTitle + missingBody
      }
    });
  }

  // create and save post response
  let response = await new Post({ author: req.user._id, type: 'original', ...req.body }).save();

  // append post id to user's posts array
  exists.posts.push(response._id);
  await exists.save();

  res.send(response);
};
