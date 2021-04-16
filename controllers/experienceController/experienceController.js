const source = require("rfr");
const { renderBody } = source('controllers/utils');
const { Skill, Experience } = source("models");

const ExperienceController = {
  get(req, res) {
    Promise.all([
      Experience.getAll(), // 0
      Skill.getAll() // 1
    ]).then((values) => {
      const body = renderBody(values[0]);
      const skills = splitList(values[1]);

      res.render("experience", {
        experiences: body,
        skillsLeft: skills.skillsLeft,
        skillsRight: skills.skillsRight
      });
    }).catch((err) => {
      console.log(err);
      res.redirect("/404");
    });
  }
};

function splitList(list) {
  const half = Math.ceil(list.length / 2);
  return {
    skillsLeft: list.splice(0, half),
    skillsRight: list.splice(-half)
  };
}

module.exports = ExperienceController;
