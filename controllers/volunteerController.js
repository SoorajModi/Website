const VolunteerController = {
  get(req, res) {
    res.render("volunteering", {
      volunteering: [
        {
          title: "Title",
          subheading: "Sub",
          uuid: "12345",
          content: "content"
        },
        {
          title: "Title2",
          subheading: "Sub2",
          uuid: "23451",
          content: "content2"
        }
      ]
    });
  }
};

module.exports = VolunteerController;
