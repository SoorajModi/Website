const mongoose = require("mongoose");
const schema = require("./schema");

const SkillModel = mongoose.model("skills", schema);

class Skill {
  constructor() {
    this._model = new SkillModel();
  }

  get skill() {
    return this._model.skill;
  }

  get uuid() {
    return this._model.uuid;
  }

  setSkill(skill) {
    if (typeof skill === "string") {
      this._model.skill = skill;
    }
    return this;
  }

  save() {
    return this._model.save().then(() => this);
  }

  static getAll() {
    return SkillModel.find({})
      .then((skills) => skills.map((s) => {
        const skill = new Skill();
        skill._model = s;
        return skill;
      }));
  }
}

module.exports = {
  Skill
};
