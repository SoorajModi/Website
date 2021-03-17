const mongoose = require("mongoose");
const { Schema } = mongoose;
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");

const volScheme = new Schema({
  title: String,
  subheading: String,
  body: String,
  date: { type: Date, default: Date.now },
  uuid: String
});

const VolModel = mongoose.model("Volunteer", volScheme);

function getVol(filter) {
  return VolModel.find(filter);
}

function createVol(req) {
  const vol = new VolModel({
    title: _.startCase(req.body.composeTitle),
    subheading: req.body.composeSubheading,
    body: req.body.composeBody,
    date: new Date(),
    uuid: uuidv4()
  });

  vol.save()
    .then((res) => console.log(`New volunteering added: ${res}`))
    .catch((err) => console.log(`Encountered error while saving new volunteering: ${err}`));
}

module.exports = {
  getVol,
  createVol,
};
