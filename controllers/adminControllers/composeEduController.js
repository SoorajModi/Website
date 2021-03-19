const source = require("rfr");
const { createEdu } = source("models/eduModel");

const ComposeExpController = {
  get: function(req, res) {
    if (req.isAuthenticated()) {
      res.render("composeEdu");
    } else {
      res.redirect("/404");
    }
  },

  post: function(req, res) {
    if (req.isAuthenticated()) {
      createEdu(req);
      res.redirect("/education");
    }
  }
};

module.exports = ComposeExpController;
