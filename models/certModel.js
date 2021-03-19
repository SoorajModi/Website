const mongoose = require("mongoose");
const { Schema } = mongoose;
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");

const certScheme = new Schema({
  title: String,
  link: String,
  date: { type: Date, default: Date.now },
  uuid: String
});

const CertModel = mongoose.model("Certifications", certScheme);

function getCert(filter) {
  return CertModel.find(filter);
}

function createCert(req) {
  const cert = new CertModel({
    title: _.startCase(req.body.composeTitle),
    link: req.body.composeLink,
    date: new Date(),
    uuid: uuidv4()
  });

  cert.save()
    .then((res) => console.log(`New certification added: ${res}`))
    .catch((err) => console.log(`Encountered error while saving new certification: ${err}`));
}

module.exports = {
  getCert,
  createCert,
};
