const mongoose = require("mongoose");
const schema = require("./schema");

const CertModel = mongoose.model("certifications", schema);

class Certification {
  constructor() {
    this.model = new CertModel();
  }

  get title() {
    return this.model.title;
  }

  get link() {
    return this.model.link;
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

  setLink(link) {
    if (typeof link === "string") {
      this.model.link = link;
    }
    return this;
  }

  save() {
    return this.model.save().then(() => this);
  }

  static getAll() {
    return CertModel.find({})
      .then((certification) => certification.map((c) => {
        const cert = new Certification();
        cert.model = c;
        return cert;
      }));
  }
}

module.exports = {
  Certification
};
