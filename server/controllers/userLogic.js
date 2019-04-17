const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Location = mongoose.model('Location');

exports.getUser = async (req, res) => {
  const exists = await User.findById(req.user._id).populate('posts');
  if (exists) {
    res.status(200).send(exists);
  } else {
    res.status(404).send({
      error: {
        // eslint-disable-next-line quotes
        message: "Couldn't find your profile. Try again later."
      }
    });
  }
};
exports.putUser = async (req, res) => {
  const exists = await User.findOne({ email: req.user.email });
  if (exists) {
    let location = await new Location({
      city: req.body.city || '',
      state: req.body.state || '',
      country: req.body.country || ''
    }).save();
    await User.findByIdAndUpdate(exists._id, { location, ...req.body }, error => {
      if (error) return res.send(error);
      return res.send({
        user: exists._id,
        update: req.body
      });
    });
  } else {
    res.status(404).send({
      error: {
        // eslint-disable-next-line quotes
        message: "Couldn't find your profile. Try again later."
      }
    });
  }
};
exports.deleteUser = async (req, res) => {
  const exists = await User.findOne({ email: req.user.email });
  if (exists) {
    await User.findByIdAndDelete(exists._id, async (error, response) => {
      if (error) throw error;
      await Post.deleteMany({_id: { $in: response.posts }}, (error) => {
        if(error) throw error;
      });
      return res.send({
        user: exists._id,
        message: 'Deleted'
      });
    });
  }
};
exports.getFollowers = async (req, res) => {
  const exists = await User.findById(req.user._id).populate('followers');
  if (exists) {
    res.status(200).send(exists.followers || []); // Send followers or empty array if none found
  } else {
    res.status(404).send({
      error: {
        // eslint-disable-next-line quotes
        message: "Couldn't find your profile. Try again later."
      }
    });
  }
};
exports.getFollowing = async (req, res) => {
  const exists = await User.findById(req.user._id).populate('following');
  if (exists) {
    res.status(200).send(exists.following || []); // Send followers or empty array if none found
  } else {
    res.status(404).send({
      error: {
        status: 404,
        // eslint-disable-next-line quotes
        message: "Couldn't find your profile. Try again later."
      }
    });
  }
};
exports.followUser = async (req, res) => {
  // Check if this user exists
  let userExists = await User.findById(req.user._id);
  if (!userExists) {
    return res.status(404).send({
      error: {
        status: 404,
        // eslint-disable-next-line quotes
        message: "Couldn't find your profile. Try again later."
      }
    });
  }
  // Confirm that request contains id field
  if (!req.body.id || req.body.length <= 0) {
    return res.status(400).send({
      error: {
        status: 400,
        message: 'This route requires an id field'
      }
    });
  }
  // Check if this user is already following
  let alreadyFollowing = userExists.following.some(id => {
    return id.equals(req.body.id);
  });
  if (alreadyFollowing) {
    return res.status(400).send({
      error: {
        status: 400,
        message: 'You are already following this user'
      }
    });
  }
  // Check if user to follow exists
  let userToFollow = await User.findById(req.body.id);
  if (!userToFollow) {
    return res.status(404).send({
      error: {
        status: 404,
        // eslint-disable-next-line quotes
        message: "Couldn't find your profile. Try again later."
      }
    });
  }
  // Add this user to user to follow's followers
  userToFollow.followers.push(req.user._id);
  await userToFollow.save();
  // Add user to follow to this user's following
  userExists.following.push(req.body.id);
  await userExists.save();

  res.status(200).send({
    success: {
      status: 200,
      message: `User ${req.body.id} followed`
    }
  });
};
exports.unfollowUser = async (req, res) => {
  // confirm this user exists
  let userExists = await User.findById(req.user._id);
  if (!userExists) {
    return res.status(404).send({
      error: {
        status: 404,
        // eslint-disable-next-line quotes
        message: "Couldn't find your profile. Try again later."
      }
    });
  }
  // Confirm that request contains id field
  if (!req.body.id || req.body.length <= 0) {
    return res.status(400).send({
      error: {
        status: 400,
        message: 'This route requires an id field'
      }
    });
  }
  // Check if this user is already following
  let isFollowing = userExists.following.some(id => {
    return id.equals(req.body.id);
  });
  if (!isFollowing) {
    return res.status(400).send({
      error: {
        status: 400,
        message: 'You are not following this user'
      }
    });
  }
  // Check if user to unfollow exists
  let userToUnfollow = await User.findById(req.body.id);
  if (!userToUnfollow) {
    return res.status(404).send({
      error: {
        status: 404,
        // eslint-disable-next-line quotes
        message: "Couldn't find your profile. Try again later."
      }
    });
  }
  // remove this user from user to unfollow's followers
  await User.findByIdAndUpdate(userToUnfollow._id, { $pull: { followers: req.user._id } });
  // remove user to unfollow from this user's following
  await User.findByIdAndUpdate(userExists._id, { $pull: { following: req.body.id } });

  res.send({
    success: {
      status: 200,
      message: `User ${req.body.id} unfollowed`
    }
  });
};
