const source = require("rfr");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt();
const { Volunteer } = source("models/volunteer");

const VolunteerController = {
  get(req, res) {
    Promise.all([
      Volunteer.getAll() // 0
    ]).then((values) => {
      res.render("volunteering", {
        volunteering: renderBody(values[0])
      });
    }).catch((err) => {
      console.log(err);
      res.redirect("/404");
    });
  }
};

function renderBody(exps) {
  exps.forEach((exp) => {
    if (exp.body) exp.body = md.render(exp.body);
  });
  return exps;
}

module.exports = VolunteerController;
