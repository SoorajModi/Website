const source = require("rfr");
const { Blog } = source("models/blog");

const DeleteController = {
  get: function(req, res) {
    if (req.isAuthenticated()) {
      Promise.resolve(
        Blog.find({ url: req.params.post }) // 0
      ).then((values) => {
        const foundPost = values[0];
        res.render("deletePost", {
          renderURL: req.params.post,
          title: foundPost.title,
          date: foundPost.date,
          body: foundPost.body
        });
      }).catch((err) => {
        console.log(err);
        res.redirect(`/404`);
      });
    } else {
      res.redirect(`/blog/${req.params.post}`);
    }
  },

  post: function(req, res) {
    if (req.isAuthenticated()) {
      Blog.deletePost({ url: req.params.post });
      res.redirect("/blog");
    } else {
      res.redirect(`/blog/${req.params.post}`);
    }
  }
};

module.exports = DeleteController;
