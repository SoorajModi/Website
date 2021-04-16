const source = require("rfr");
const { renderBody } = source("controllers/utils");
const { Volunteer } = source("models");

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

module.exports = VolunteerController;
