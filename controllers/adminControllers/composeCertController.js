const source = require("rfr");

const { Certification } = source("models");

const ComposeCertController = {
  get(req, res) {
    if (req.isAuthenticated()) {
      res.render("composeCert");
    } else {
      res.redirect("/404");
    }
  },

  post(req, res) {
    if (req.isAuthenticated()) {
      const certification = new Certification();

      certification.setTitle(req.body.composeTitle);
      certification.setLink(req.body.composeLink);
      certification.save()
        .then(() => console.log("Successfully written certification to database"))
        .catch((e) => console.log("failed to save the certification to the database", e));

      res.redirect("/education");
    }
  }
};

module.exports = ComposeCertController;
