const source = require("rfr");
const { createSkill } = source("models/skillsModel");

const ComposeSkillController = {
  get: function(req, res) {
    if (req.isAuthenticated()) {
      res.render("composeSkill");
    } else {
      res.redirect("/404");
    }
  },

  post: function(req, res) {
    if (req.isAuthenticated()) {
      createSkill(req);
      res.redirect("/experience");
    }
  }
};

module.exports = ComposeSkillController;
