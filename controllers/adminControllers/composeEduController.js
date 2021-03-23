const source = require("rfr");

const { Education } = source("models/education");

const ComposeExpController = {
  get(req, res) {
    if (req.isAuthenticated()) {
      res.render("composeEdu");
    } else {
      res.redirect("/404");
    }
  },

  post(req, res) {
    if (req.isAuthenticated()) {
      const edu = new Education();

      edu.setTitle(req.body.composeTitle);
      edu.setSubheading(req.body.composeSubheading);
      if (isStringEmpty(req.body.composeBody)) edu.setBody(req.body.composeBody);
      edu.save()
        .then(() => console.log("Successfully written education to database"))
        .catch((e) => console.log("failed to save the education to the database", e));

      res.redirect("/education");
    }
  }
};

function isStringEmpty(str) {
  return (!(!str || str.trim().isEmpty));
}

module.exports = ComposeExpController;
