const mongoose = require("mongoose");
const { Schema } = mongoose;
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");

const expScheme = new Schema({
  title: String,
  subheading: String,
  body: String,
  date: { type: Date, default: Date.now },
  uuid: String
});

const ExpModel = mongoose.model("Experience", expScheme);

function getExp(filter) {
  return ExpModel.find(filter);
}

function createExp(req) {
  const exp = new ExpModel({
    title: _.startCase(req.body.composeTitle),
    subheading: req.body.composeSubheading,
    body: req.body.composeBody,
    date: new Date(),
    uuid: uuidv4()
  });

  exp.save()
    .then((res) => console.log(`New experience added: ${res}`))
    .catch((err) => console.log(`Encountered error while saving new experience: ${err}`));
}

module.exports = {
  getExp,
  createExp,
};
