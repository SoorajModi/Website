const mongoose = require("mongoose");
const schema = require("./schema");

const EduModel = mongoose.model("educations", schema);

class Education {
  constructor() {
    this.model = new EduModel();
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
    return EduModel.find({})
      .then((education) => education.map((e) => {
        const edu = new Education();
        edu.model = e;
        return edu;
      }));
  }
}

module.exports = {
  Education
};
