const source = require("rfr");
const { createExp } = source("models/experienceModel");

const ComposePostController = {
  get: function(req, res) {
    if (req.isAuthenticated()) {
      res.render("composeExp");
    } else {
      res.redirect("/404");
    }
  },

  post: function(req, res) {
    if (req.isAuthenticated()) {
      createExp(req);
      res.redirect("/experience");
    }
  }
};

module.exports = ComposePostController;
