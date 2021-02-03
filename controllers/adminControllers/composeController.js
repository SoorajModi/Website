const source = require("rfr");
const MarkdownIt = require("markdown-it");
const { createPost } = source("models/blogModel");

const ComposeController = {
  get: function(req, res) {
    if (req.isAuthenticated()) {
      res.render("compose", {
        markdown: MarkdownIt
      });
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

module.exports = ComposeController;