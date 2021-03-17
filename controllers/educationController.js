const source = require("rfr");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt();
const { getEdu } = source("models/eduModel");
const { getCert } = source("models/certModel");

const EducationController = {
  get(req, res) {
    getEdu({}).then((foundEdus) => {
      getCert({}).then((foundCerts) => {
        res.render("education", {
          education: renderBody(foundEdus),
          certifications: foundCerts,
        });
      })
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

module.exports = EducationController;
