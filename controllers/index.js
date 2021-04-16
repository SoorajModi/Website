const { BlogController, BlogPostController } = require("./blogController");
const { ContactController } = require("./contactController");
const { EducationController } = require('./educationController');
const { ExperienceController } = require('./experienceController');
const { HomeController } = require('./homeController');
const { NotFoundController } = require('./notFoundController');
const { ResumeController } = require('./resumeController');
const { VolunteerController } = require('./volunteerController');

module.exports = {
  BlogController,
  BlogPostController,
  ContactController,
  EducationController,
  ExperienceController,
  HomeController,
  NotFoundController,
  ResumeController,
  VolunteerController,
};
