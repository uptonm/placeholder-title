const mongoose = require('mongoose');
const user = mongoose.model('users');

exports.getUser = async (req, res) => {
  const exists = await user.findOne({ email: req.user.email });
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
    await user.findByIdAndUpdate(exists._id, req.body, (error, response) => {
      if (error) return res.send(error);
      return res.send(response);
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
