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
const ComposePostController = source('controllers/adminControllers/composePostController');
const EditController = source('controllers/adminControllers/editController');
const DeleteController = source('controllers/adminControllers/deleteController');
const ComposeExpController = source('controllers/adminControllers/composeExpController');
const ComposeSkillController = source('controllers/adminControllers/composeSkillController');
const ComposeVolController = source('controllers/adminControllers/composeVolController');
const ComposeEduController = source('controllers/adminControllers/composeEduController');
const ComposeCertController = source('controllers/adminControllers/composeCertController');

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

router.get('/blog/compose', ComposePostController.get);
router.post('/blog/compose', ComposePostController.post);

router.get('/blog/:post/edit', EditController.get);
router.post('/blog/:post/edit', EditController.post);

router.get('/blog/:post/delete', DeleteController.get);
router.post('/blog/:post/delete', DeleteController.post);

router.get('/experience/compose', ComposeExpController.get);
router.post('/experience/compose', ComposeExpController.post);

router.get('/experience/skill/compose', ComposeSkillController.get);
router.post('/experience/skill/compose', ComposeSkillController.post);

router.get('/volunteering/compose', ComposeVolController.get);
router.post('/volunteering/compose', ComposeVolController.post);

router.get('/education/compose', ComposeEduController.get);
router.post('/education/compose', ComposeEduController.post);

router.get('/education/certification/compose', ComposeCertController.get);
router.post('/education/certification/compose', ComposeCertController.post);

router.get('/blog/:post', BlogController.getPost);  // Must be below /blog/compose route

// 404 Errors
router.use(NotFoundController.get);

module.exports = router;
