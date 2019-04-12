const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { LocationSchema } = require('./location');
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  first: String,
  last: String,
  bio: String,
  location: LocationSchema,
  education: String,
  avatar: String,
  username: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

UserSchema.pre('save', async function(next) {
  //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
  //your application becomes.
  const hash = await bcrypt.hash(this.password, 1);
  //Replace the plain text password with the hash and then store it
  this.password = hash;
  next();
});

UserSchema.pre('remove', async function(next) {
  // On User Deleteing profile we should aggregate through the Post collection and delete their posts
  const Post = mongoose.model('Post');
  await this.posts.map(async post => {
    await Post.findByIdAndDelete(post._id);
  });
  next();
});

//We'll use this later on to make sure that the user trying to log in has the correct credentials
UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  //Hashes the password sent by the user for login and checks if the hashed password stored in the
  //database matches the one sent. Returns true if it does else false.
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const UserModel = mongoose.model('User', UserSchema, 'users');

module.exports = UserModel;
