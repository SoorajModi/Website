const source = require("rfr");
const { renderBody } = source("controllers/utils");
const { Education, Certification } = source("models");

const EducationController = {
  get(req, res) {
    Promise.all([
      Education.getAll(), // 0
      Certification.getAll() // 1
    ]).then((values) => {
      res.render("education", {
        education: renderBody(values[0]),
        certifications: values[1]
      });
    }).catch((err) => {
      console.log(err);
      res.redirect("/404");
    });
  }
};

module.exports = EducationController;
