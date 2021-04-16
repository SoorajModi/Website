const source = require("rfr");

const { Experience } = source("models");

const EditExpController = {
  get(req, res) {
    if (req.isAuthenticated()) {
      Promise.resolve(
        Experience.find({ uuid: req.params.post }) // 0
      ).then((values) => {
        const foundExp = values[0];
        console.log(foundExp);
        res.render("editExp", {
          title: foundExp.title,
          date: foundExp.date,
          body: foundExp.body,
          uuid: foundExp.uuid,
        });
      }).catch((err) => {
        console.log(err);
        res.redirect("/404");
      });
    } else {
      res.redirect("/404");
    }
  },

  post(req, res) {
    if (req.isAuthenticated()) {
      Experience.update({ uuid: req.params.post }, {
        title: req.body.editTitle,
        subheading: req.body.editSubheading,
        body: req.body.editBody,
        date: req.body.editDate,
      });

      res.redirect(`/experience`);
    } else {
      res.redirect(`/experience`);
    }
  }
};

module.exports = EditExpController;
