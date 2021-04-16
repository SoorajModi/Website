const mongoose = require("mongoose");
const schema = require("./schema");

const SkillModel = mongoose.model("skills", schema);

class Skill {
  constructor() {
    this.model = new SkillModel();
  }

  get skill() {
    return this.model.skill;
  }

  get uuid() {
    return this.model.uuid;
  }

  setSkill(skill) {
    if (typeof skill === "string") {
      this.model.skill = skill;
    }
    return this;
  }

  save() {
    return this.model.save().then(() => this);
  }

  static getAll() {
    return SkillModel.find({})
      .then((skills) => skills.map((s) => {
        const skill = new Skill();
        skill.model = s;
        return skill;
      }));
  }

  static find(filter) {
    return SkillModel.find(filter)
      .then((skills) => skills.map((s) => {
        const skill = new Skill();
        skill.model = s;
        return skill;
      }));
  }
}

module.exports = {
  Skill
};
