const mongoose = require("mongoose");
const schema = require("./schema");

const ExpModel = mongoose.model("experience", schema);

class Experience {
  constructor() {
    this._model = new ExpModel();
  }

  get _mongoId() {
    return this._model._id;
  }

  get title() {
    return this._model.title;
  }

  get subheading() {
    return this._model.subheading;
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
    }
    return this;
  }

  setSubheading(subheading) {
    if (typeof subheading === "string") {
      this._model.subheading = subheading;
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

  static getAll() {
    return ExpModel.find({})
      .then((exps) => exps.map((e) => {
        const exp = new Experience();
        exp._model = e;
        return exp;
      }));
  }
}

module.exports = {
  Experience
};
