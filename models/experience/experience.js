const mongoose = require("mongoose");
const schema = require("./schema");

const ExpModel = mongoose.model("experiences", schema);

class Experience {
  constructor() {
    this.model = new ExpModel();
  }

  get title() {
    return this.model.title;
  }

  get subheading() {
    return this.model.subheading;
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
    }
    return this;
  }

  setSubheading(subheading) {
    if (typeof subheading === "string") {
      this.model.subheading = subheading;
    }
    return this;
  }

  setBody(body) {
    if (typeof body === "string") {
      this.model.body = body;
    }
    return this;
  }

  static update(filter, update) {
    return ExpModel.findOneAndUpdate(filter, update)
      .then((res) => console.log(`Successfully edited experience post: ${res}`))
      .catch((err) => console.log(`Error: could not update experience post: ${err}`));
  }

  save() {
    return this.model.save().then(() => this);
  }

  static getAll() {
    return ExpModel.find({})
      .then((exps) => exps.map((e) => {
        const exp = new Experience();
        exp.model = e;
        return exp;
      }));
  }
}

module.exports = {
  Experience
};
