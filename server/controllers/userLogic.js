const mongoose = require('mongoose');
const user = mongoose.model('User');

exports.getUser = async (req, res) => {
  const exists = await user.findById(req.user._id).populate('posts');
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
  const exists = await user.findOne({ email: req.user.email });
  if (exists) {
    await user.findByIdAndUpdate(exists._id, req.body, (error) => {
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
  const exists = await user.findOne({email: req.user.email});
  if (exists) {
    await user.findByIdAndDelete(exists._id, (error) => {
      if (error) throw error;
      return res.send({
        user: exists._id,
        message: 'Deleted'
      });
    });
  }
};

exports.getFollowers = async (req, res) => {
  const exists = await user.findById(req.user._id).populate('followers');
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
  const exists = await user.findById(req.user._id).populate('following');
  if (exists) {
    res.status(200).send(exists.following || []); // Send followers or empty array if none found
  } else {
    res.status(404).send({
      error: {
        // eslint-disable-next-line quotes
        message: "Couldn't find your profile. Try again later."
      }
    });
  }
};