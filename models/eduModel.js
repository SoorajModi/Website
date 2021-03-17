const mongoose = require("mongoose");
const { Schema } = mongoose;
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");

const eduScheme = new Schema({
  title: String,
  subheading: String,
  body: String,
  date: { type: Date, default: Date.now },
  uuid: String
});

const EduModel = mongoose.model("Education", eduScheme);

function getEdu(filter) {
  return EduModel.find(filter);
}

function createEdu(req) {
  const edu = new EduModel({
    title: _.startCase(req.body.composeTitle),
    subheading: req.body.composeSubheading,
    body: req.body.composeBody,
    date: new Date(),
    uuid: uuidv4()
  });

  edu.save()
    .then((res) => console.log(`New volunteering added: ${res}`))
    .catch((err) => console.log(`Encountered error while saving new volunteering: ${err}`));
}

module.exports = {
  getEdu,
  createEdu,
};
