const mongoose = require("mongoose");
const schema = require("./schema");

const CertModel = mongoose.model("certifications", schema);

class Certification {
  constructor() {
    this._model = new CertModel();
  }

  get title() {
    return this._model.title;
  }

  get link() {
    return this._model.link;
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

  setLink(link) {
    if (typeof link === "string") {
      this._model.link = link;
    }
    return this;
  }

  save() {
    return this._model.save().then(() => this);
  }

  static getAll() {
    return CertModel.find({})
      .then((cert) => cert.map((c) => {
        const cert = new Certification();
        cert._model = c;
        return cert;
      }));
  }
}

module.exports = {
  Certification: Certification
};
