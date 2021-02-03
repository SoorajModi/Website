const source = require('rfr');
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt();
const { getPosts, getOnePost } = source('models/blogModel');

const BlogController = {
  get(req, res) {
    getPosts({}).then((foundPosts) => {
      res.render('blog', {
        blog: foundPosts,
      });
    }).catch((err) => {
      console.log(err);
      res.redirect('/404');
    });
  },

  getPost(req, res) {
    getOnePost({ url: req.params.post })
      .then((foundPost) => {
        res.render('post', {
          title: foundPost.title,
          date: foundPost.date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          body: md.render(foundPost.body),
        });
      })
      .catch((err) => {
        console.log(err);
        res.redirect('/404');
      });
  },
};

module.exports = BlogController;
