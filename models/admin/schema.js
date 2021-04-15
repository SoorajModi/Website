const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

schema.plugin(passportLocalMongoose); // Used to hash and salt users, and save to MongoDB

module.exports = schema;
