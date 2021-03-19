const source = require("rfr");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt();
const { getExp } = source("models/experienceModel");
const { getSkill } = source("models/skillsModel");

const ExperienceController = {
  get(req, res) {
    getExp({}).then((foundExps) => {
      getSkill({}).then((foundSkills) => {
        const skills = splitList(foundSkills);
        console.log(skills);
        res.render("experience", {
          experiences: renderBody(foundExps),
          skillsLeft: skills.skillsLeft,
          skillsRight: skills.skillsRight
        });
      });
    }).catch((err) => {
      console.log(err);
      res.redirect("/404");
    });
  }
};

function renderBody(exps) {
  exps.forEach((exp) => {
    exp.body = md.render(exp.body);
  });
  return exps;
}

function splitList(list) {
  const half = Math.ceil(list.length / 2);
  return {
    skillsLeft: list.splice(0, half),
    skillsRight: list.splice(-half)
  };
}

module.exports = ExperienceController;
