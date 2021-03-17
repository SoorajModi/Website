const source = require("rfr");
const { createCert } = source("models/certModel");

const ComposeCertController = {
  get: function(req, res) {
    if (req.isAuthenticated()) {
      res.render("composeCert");
    } else {
      res.redirect("/404");
    }
  },

  post: function(req, res) {
    if (req.isAuthenticated()) {
      createCert(req);
      res.redirect("/education");
    }
  }
};

module.exports = ComposeCertController;
