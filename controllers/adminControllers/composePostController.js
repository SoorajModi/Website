const source = require("rfr");
const _ = require('lodash');

const { Blog } = source("models");

const ComposePostController = {
  get(req, res) {
    if (req.isAuthenticated()) {
      res.render("composePost");
    } else {
      res.redirect("/404");
    }
  },

  post(req, res) {
    if (req.isAuthenticated()) {
      const blog = new Blog();

      blog.setTitle(_.startCase(req.body.composeTitle));
      blog.setBody(req.body.composeBody);
      blog.save()
        .then(() => console.log("Successfully written blog post to database"))
        .catch((e) => console.log("Failed to save the blog post to the database", e));

      res.redirect("/blog");
    }
  }
};

module.exports = ComposePostController;
