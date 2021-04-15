const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const schema = new mongoose.Schema({
  skill: {
    type: String,
    required: true
  },
  uuid: {
    type: String,
    default: uuidv4(),
    required: true
  }
});

module.exports = schema;
