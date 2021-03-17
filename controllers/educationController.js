const EducationController = {
  get(req, res) {
    res.render("education", {
      education: [
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
      ],
      certifications: [
        {
          name: "Cert",
          link: "https://google.com"
        }
      ]
    });
  }
};

module.exports = EducationController;
