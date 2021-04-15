const source = require("rfr");

const { Skill } = source("models");

const ComposeSkillController = {
  get(req, res) {
    if (req.isAuthenticated()) {
      res.render("composeSkill");
    } else {
      res.redirect("/404");
    }
  },

  post(req, res) {
    if (req.isAuthenticated()) {
      const skill = new Skill();

      skill.setSkill(req.body.composeSkill);
      skill.save()
        .then(() => console.log("Successfully written skill to database"))
        .catch((e) => console.log("failed to save the skill to the database", e));

      res.redirect("/experience");
    }
  }
};

module.exports = ComposeSkillController;
