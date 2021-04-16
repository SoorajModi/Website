const source = require("rfr");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt();
const { Education, Certification } = source("models");

const EducationController = {
  get(req, res) {
    Promise.all([
      Education.getAll(), // 0
      Certification.getAll() // 1
    ]).then((values) => {
      res.render("education", {
        education: renderBody(values[0]),
        certifications: values[1]
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

module.exports = EducationController;
