const source = require("rfr");
const {
  getOnePost, deletePost
} = source("models/blogModel");

const DeleteController = {
  get: function(req, res) {
    if (req.isAuthenticated()) {
      getOnePost({ url: req.params.post })
        .then((foundPost) => res.render("deletePost", {
          renderURL: req.params.post,
          title: foundPost.title,
          date: foundPost.date,
          description: foundPost.description,
          body: foundPost.body
        }))
        .catch((e) => {
          console.log(e);
          res.redirect("/404");
        });
    } else {
      res.redirect(`/blog/${req.params.post}`);
    }
  },

  post: function(req, res) {
    if (req.isAuthenticated()) {
      deletePost({ url: req.params.post });
      res.redirect("/blog");
    } else {
      res.redirect(`/blog/${req.params.post}`);
    }
  }
};

module.exports = DeleteController;