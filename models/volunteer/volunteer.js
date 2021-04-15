const mongoose = require("mongoose");
const schema = require("./schema");

const VolModel = mongoose.model("volunteers", schema);

class Volunteer {
  constructor() {
    this.model = new VolModel();
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

  save() {
    return this.model.save().then(() => this);
  }

  static getAll() {
    return VolModel.find({})
      .then((volunteer) => volunteer.map((v) => {
        const vol = new Volunteer();
        vol.model = v;
        return vol;
      }));
  }
}

module.exports = {
  Volunteer
};
