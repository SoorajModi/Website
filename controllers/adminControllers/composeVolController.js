const source = require("rfr");
const { createVol } = source("models/volModel");

const ComposeVolController = {
  get: function(req, res) {
    if (req.isAuthenticated()) {
      res.render("composeVol");
    } else {
      res.redirect("/404");
    }
  },

  post: function(req, res) {
    if (req.isAuthenticated()) {
      createVol(req);
      res.redirect("/volunteering");
    }
  }
};

module.exports = ComposeVolController;
