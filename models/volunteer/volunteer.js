const mongoose = require("mongoose");
const schema = require("./schema");

const VolModel = mongoose.model("volunteers", schema);

class Volunteer {
  constructor() {
    this._model = new VolModel();
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
    return VolModel.find({})
      .then((vol) => vol.map((v) => {
        const vol = new Volunteer();
        vol._model = v;
        return vol;
      }));
  }
}

module.exports = {
  Volunteer
};
