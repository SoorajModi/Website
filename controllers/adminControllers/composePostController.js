const source = require("rfr");
const { createPost } = source("models/blogModel");

const ComposePostController = {
  get: function(req, res) {
    if (req.isAuthenticated()) {
      res.render("composePost");
    } else {
      res.redirect("/404");
    }
  },

  post: function(req, res) {
    if (req.isAuthenticated()) {
      createPost(req);
      res.redirect("/blog");
    }
  }
};

module.exports = ComposePostController;
