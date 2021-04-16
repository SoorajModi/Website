const source = require("rfr");
const { renderBody } = source("controllers/utils");
const {
  Blog,
  Certification,
  Education,
  Experience,
  Skill,
  Volunteer
} = source("models");

const AdminController = {
  get(req, res) {
    if (req.isAuthenticated()) {
      Promise.all([
        Experience.find({}),
        Education.find({}),
        Certification.find({}),
        Volunteer.find({}),
        Blog.find({}),
        Skill.find({})
      ]).then((values) => {
        res.render("admin", {
          experiences: renderBody(values[0]),
          education: renderBody(values[1]),
          certifications: values[2],
          volunteer: renderBody(values[3]),
          blog: values[4],
          skills: values[5]
        });
      });
    } else {
      res.redirect("/404");
    }
  }
};

module.exports = AdminController;
