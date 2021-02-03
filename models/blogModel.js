const mongoose = require('mongoose');

const { Schema } = mongoose;
const _ = require('lodash');

const blogSchema = new Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now },
  body: String,
  url: String,
});

const BlogModel = mongoose.model('BlogPostTest', blogSchema);

function getPosts(filter) {
  return BlogModel.find(filter);
}

function getOnePost(filter) {
  return BlogModel.findOne(filter);
}

function createPost(req) {
  const blogPost = new BlogModel({
    title: _.startCase(req.body.composeTitle),
    description: req.body.composeDescription,
    body: req.body.composeBody,
    date: new Date(),
    url: (req.body.composeTitle).replace(/\s+/g, '-').toLowerCase(),
  });

  blogPost.save()
    .then((res) => console.log(`New blog post added: ${res}`))
    .catch((err) => console.log(`Encountered error while saving new Blog Post: ${err}`));
}

function updatePost(filter, update) {
  BlogModel.findOneAndUpdate(filter, update)
    .then((res) => console.log(`Successfully edited blog post: ${res}`))
    .catch((err) => console.log(`Error: could not update blogpost: ${err}`));
}

function deletePost(filter) {
  BlogModel.findOneAndDelete(filter)
    .then((res) => console.log(`Successfully deleted Blog Post: ${res}`))
    .catch((err) => console.log(`Error trying to delete blog post: ${err}`));
}

module.exports = {
  getPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
};
