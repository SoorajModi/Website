const express = require("express");
const source = require("rfr");
const HomeController = source("controllers/homeController");
const ExperienceController = source("controllers/experienceController");
const EducationController = source("controllers/educationController");
const VolunteerController = source("controllers/volunteerController");
const ResumeController = source("controllers/resumeController");
const ContactController = source("controllers/contactController");
const BlogController = source("controllers/blogController");
const NotFoundController = source("controllers/notFoundController");

const routes = express();

routes.get("/", HomeController.get);
routes.get("/experience", ExperienceController.get);
routes.get("/education", EducationController.get);
routes.get("/volunteering", VolunteerController.get);
routes.get("/resume", ResumeController.get);
routes.get("/contact", ContactController.get);
routes.get("/blog", BlogController.get);
routes.get("/blog/:post", BlogController.getPost);

// 404 Errors
routes.use(NotFoundController.get);

module.exports = routes;