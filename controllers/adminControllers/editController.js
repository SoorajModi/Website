const source = require("rfr");
const {
  getOnePost, updatePost
} = source("models/blogModel");
const _ = require('lodash');

const EditController = {
  get: function(req, res) {
    if (req.isAuthenticated()) {
      getOnePost({ url: req.params.post })
        .then((foundPost) => {
          res.render("editPost", {
            url: foundPost.url,
            title: foundPost.title,
            date: foundPost.date,
            description: foundPost.description,
            body: foundPost.body
          });
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/404");
        });
    } else {
      res.redirect("/404");
    }
  },

  post: function(req, res) {
    if (req.isAuthenticated()) {
      const newTitle = _.startCase(req.body.editTitle);
      const newURL = (req.body.editTitle).replace(/\s+/g, "-").toLowerCase();

      updatePost({ url: req.params.post }, {
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