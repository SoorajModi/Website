const mongoose = require("mongoose");
const schema = require("./schema");

const BlogModel = mongoose.model("blog", schema);

class Blog {
  constructor() {
    this.model = new BlogModel();
  }

  get title() {
    return this.model.title;
  }

  get url() {
    return this.model.url;
  }

  get body() {
    return this.model.body;
  }

  get date() {
    return this.model.date;
  }

  get uuid() {
    return this.model.uuid;
  }

  setTitle(title) {
    if (typeof title === "string") {
      this.model.title = title;
      this.model.url = (title).replace(/\s+/g, "-").toLowerCase();
    }
    return this;
  }

  setBody(body) {
    if (typeof body === "string") {
      this.model.body = body;
    }
    return this;
  }

  save() {
    return this.model.save().then(() => this);
  }

  static find(filter) {
    return BlogModel.find(filter)
      .then((blogs) => blogs.map((b) => {
        const blog = new Blog();
        blog.model = b;
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
  Blog
};
