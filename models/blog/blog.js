const mongoose = require("mongoose");
const schema = require("./schema");

const BlogModel = mongoose.model("blogposts", schema);

class Blog {
  constructor() {
    this._model = new BlogModel();
  }

  get title() {
    return this._model.title;
  }

  get url() {
    return this._model.url;
  }

  get body() {
    return this._model.body;
  }

  get date() {
    return this._model.date;
  }

  get uuid() {
    return this._model.uuid;
  }

  setTitle(title) {
    if (typeof title === "string") {
      this._model.title = title;
      this._model.url = (title).replace(/\s+/g, "-").toLowerCase();
    }
    return this;
  }

  setBody(body) {
    if (typeof body === "string") {
      this._model.body = body;
    }
    return this;
  }

  save() {
    return this._model.save().then(() => this);
  }

  static find(filter) {
    return BlogModel.find(filter)
      .then((blogs) => blogs.map((b) => {
        const blog = new Blog();
        blog._model = b;
        return blog;
      }));
  }

  static updatePost(filter, update) {
    return BlogModel.findOneAndUpdate(filter, update)
      .then((res) => console.log(`Successfully edited blog post: ${res}`))
      .catch((err) => console.log(`Error: could not update blogpost: ${err}`));
  }

  static deletePost(filter) {
    return BlogModel.findOneAndDelete(filter)
      .then((res) => console.log(`Successfully deleted Blog Post: ${res}`))
      .catch((err) => console.log(`Error trying to delete blog post: ${err}`));
  }
}

module.exports = {
  Blog: Blog
};
