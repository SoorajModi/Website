const mongoose = require("mongoose");
const { Schema } = mongoose;
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");

const skillScheme = new Schema({
  skill: String,
  uuid: String
});

const SkillModel = mongoose.model("Skills", skillScheme);

function getSkill(filter) {
  return SkillModel.find(filter);
}

function createSkill(req) {
  const skill = new SkillModel({
    skill: _.startCase(req.body.composeSkill),
    uuid: uuidv4()
  });

  skill.save()
    .then((res) => console.log(`New certification added: ${res}`))
    .catch((err) => console.log(`Encountered error while saving new certification: ${err}`));
}

module.exports = {
  getSkill,
  createSkill
};
