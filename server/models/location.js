const mongoose = require('mongoose');
const { Schema } = mongoose;

const LocationSchema = new Schema({
  city: String,
  state: String,
  country: String
});

const Location = mongoose.model('Location', LocationSchema, 'locations');
module.exports = { Location, LocationSchema };
