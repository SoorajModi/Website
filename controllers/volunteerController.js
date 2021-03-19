const source = require("rfr");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt();
const { getVol } = source("models/volModel");

const VolunteerController = {
  get(req, res) {
    getVol({}).then((foundVols) => {
      res.render("volunteering", {
        volunteering: renderBody(foundVols)
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

module.exports = VolunteerController;
