const source = require("rfr");
const { Volunteer } = source("models/volunteer");

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
      const vol = new Volunteer();

      vol.setTitle(req.body.composeTitle);
      vol.setSubheading(req.body.composeSubheading);
      if (isStringEmpty(req.body.composeBody)) vol.setBody(req.body.composeBody);
      vol.save()
        .then(() => console.log("Successfully written volunteer to database"))
        .catch((e) => console.log("failed to save the volunteer to the database", e));

      res.redirect("/volunteering");
    }
  }
};

function isStringEmpty(str) {
  return (!(!str || str.trim().isEmpty));
}

module.exports = ComposeVolController;
