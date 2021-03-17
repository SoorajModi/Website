const source = require("rfr");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt();
const { getExp } = source("models/experienceModel");
const { getSkill } = source("models/skillsModel");

const ExperienceController = {
  get(req, res) {
    getExp({}).then((foundExps) => {
      getSkill({}).then((foundSkills) => {
        res.render("experience", {
          experiences: renderBody(foundExps),
          skillsLeft: foundSkills,
          skillsRight: foundSkills
        });
      });
    }).catch((err) => {
      console.log(err);
      res.redirect("/404");
    });
  }
};

function renderBody(exps) {
  console.log(exps);
  exps.forEach((exp) => {
    exp.body = md.render(exp.body);
  });
  console.log(exps);
  return exps;
}

module.exports = ExperienceController;
