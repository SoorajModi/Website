const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  skill: {
    type: String,
    required: true
  },
  uuid: {
    type: String,
    required: true
  }
});

module.exports = schema;
