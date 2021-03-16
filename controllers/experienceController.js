const ExperienceController = {
  get(req, res) {
    res.render("experience", {
      experiences: [
        {
          title: "Title",
          subheading: "Subheading",
          content: "Content",
          uuid: "123456789"
        },
        {
          title: "Title",
          subheading: "Subheading",
          content: "Content",
          uuid: "234567891"
        }
      ],
      skillsLeft: [
        "skill1",
        "skill2"
      ],
      skillsRight: [
        "skill3",
        "skill4"
      ]
    });
  }
};

module.exports = ExperienceController;
