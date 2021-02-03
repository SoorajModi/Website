const express = require('express');
const source = require('rfr');

const HomeController = source('controllers/homeController');
const ExperienceController = source('controllers/experienceController');
const EducationController = source('controllers/educationController');
const VolunteerController = source('controllers/volunteerController');
const ResumeController = source('controllers/resumeController');
const ContactController = source('controllers/contactController');
const BlogController = source('controllers/blogController');
const NotFoundController = source('controllers/notFoundController');
const LoginController = source('controllers/adminControllers/loginController');
const LogoutController = source('controllers/adminControllers/logoutController');
const ComposeController = source('controllers/adminControllers/composeController');
const EditController = source('controllers/adminControllers/editController');
const DeleteController = source('controllers/adminControllers/deleteController');

const router = express();

router.get('/', HomeController.get);
router.get('/experience', ExperienceController.get);
router.get('/education', EducationController.get);
router.get('/volunteering', VolunteerController.get);
router.get('/resume', ResumeController.get);
router.get('/contact', ContactController.get);
router.get('/blog', BlogController.get);

// Admin routes
router.get('/login', LoginController.get);
router.post('/login', LoginController.post);

router.get('/logout', LogoutController.get);

router.get('/blog/compose', ComposeController.get);
router.post('/blog/compose', ComposeController.post);

router.get('/blog/:post/edit', EditController.get);
router.post('/blog/:post/edit', EditController.post);

router.get('/blog/:post/delete', DeleteController.get);
router.post('/blog/:post/delete', DeleteController.post);

router.get('/blog/:post', BlogController.getPost);  // Must be below /blog/compose route

// 404 Errors
router.use(NotFoundController.get);

module.exports = router;
