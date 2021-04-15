const source = require("rfr");
const _ = require("lodash");

const { Blog } = source("models");

const EditController = {
  get(req, res) {
    if (req.isAuthenticated()) {
      Promise.resolve(
        Blog.find({ url: req.params.post }) // 0
      ).then((values) => {
        const foundPost = values[0];
        res.render("editPost", {
          url: foundPost.url,
          title: foundPost.title,
          date: foundPost.date,
          body: foundPost.body
        });
      }).catch((err) => {
        console.log(err);
        res.redirect("/404");
      });
    } else {
      res.redirect("/404");
    }
  },

  post(req, res) {
    if (req.isAuthenticated()) {
      const newTitle = _.startCase(req.body.editTitle);
      const newURL = (req.body.editTitle).replace(/\s+/g, "-").toLowerCase();

      Blog.update({ url: req.params.post }, {
        title: newTitle,
        description: req.body.editDescription,
        body: req.body.editBody,
        date: req.body.editDate,
        url: newURL
      });

      res.redirect(`/blog/${newURL}`);
    } else {
      res.redirect(`/blog/${req.params.post}`);
    }
  }
};

module.exports = EditController;
