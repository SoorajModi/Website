const source = require("rfr");

const { Experience } = source("models");

const ComposeExpController = {
  get(req, res) {
    if (req.isAuthenticated()) {
      res.render("composeExp");
    } else {
      res.redirect("/404");
    }
  },

  post(req, res) {
    if (req.isAuthenticated()) {
      const exp = new Experience();

      exp.setTitle(req.body.composeSkill);
      exp.setSubheading(req.body.composeSkill);
      exp.setBody(req.body.composeSkill);
      exp.save()
        .then(() => console.log("Successfully written experience to database"))
        .catch((e) => console.log("failed to save the experience to the database", e));

      res.redirect("/experience");
    }
  }
};

module.exports = ComposeExpController;
