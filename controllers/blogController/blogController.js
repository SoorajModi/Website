const source = require("rfr");
const { Blog } = source("models");

const BlogController = {
  get(req, res) {
    Promise.all([
      Blog.find({}) // 0
    ]).then((values) => {
      res.render("blog", {
        blog: values[0]
      });
    }).catch((err) => {
      console.log(err);
      res.redirect("/404");
    });
  },
};

module.exports = BlogController;
