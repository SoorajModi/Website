const source = require('rfr');
const MarkdownIt = require('markdown-it');

const {
  getOnePost, createPost, updatePost, deletePost,
} = source('models/blogModel');
const _ = require('lodash');

const AdminController = {
  getCompose(req, res) {
    if (req.isAuthenticated()) {
      res.render('compose', {
        markdown: MarkdownIt,
      });
    } else {
      res.redirect('/404');
    }
  },

  postCompose(req, res) {
    if (req.isAuthenticated()) {
      createPost(req);
      res.redirect('/blog');
    }
  },

  getEdit(req, res) {
    if (req.isAuthenticated()) {
      getOnePost({ url: req.params.post })
        .then((foundPost) => {
          res.render('editPost', {
            url: foundPost.url,
            title: foundPost.title,
            date: foundPost.date,
            description: foundPost.description,
            body: foundPost.body,
          });
        })
        .catch((err) => {
          console.log(err);
          res.redirect('/404');
        });
    } else {
      res.redirect('/404');
    }
  },

  postEdit(req, res) {
    if (req.isAuthenticated()) {
      const newTitle = _.startCase(req.body.editTitle);
      const newURL = (req.body.editTitle).replace(/\s+/g, '-').toLowerCase();

      updatePost({ url: req.params.post }, {
        title: newTitle,
        description: req.body.editDescription,
        body: req.body.editBody,
        date: req.body.editDate,
        url: newURL,
      });

      res.redirect(`/blog/${newURL}`);
    } else {
      res.redirect(`/blog/${req.params.post}`);
    }
  },

  getDelete(req, res) {
    if (req.isAuthenticated()) {
      getOnePost({ url: req.params.post })
        .then((foundPost) => res.render('deletePost', {
          renderURL: req.params.post,
          title: foundPost.title,
          date: foundPost.date,
          description: foundPost.description,
          body: foundPost.body,
        }))
        .catch((e) => {
          console.log(e);
          res.redirect('/404');
        });
    } else {
      res.redirect(`/blog/${req.params.post}`);
    }
  },

  postDelete(req, res) {
    if (req.isAuthenticated()) {
      deletePost({ url: req.params.post });
      res.redirect('/blog');
    } else {
      res.redirect(`/blog/${req.params.post}`);
    }
  },
};

module.exports = AdminController;
