const source = require("rfr");
require("dotenv").config();
source("models/user");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const session = require("express-session");
const passport = require("passport");
const { getPosts, getOnePost, createPost, updatePost, deletePost } = source("models/blogPost");
const HomeController = source("controllers/homeController");
const ExperienceController = source("controllers/experienceController");
const EducationController = source("controllers/educationController");
const VolunteerController = source("controllers/volunteerController");
const ResumeController = source("controllers/resumeController");
const ContactController = source("controllers/contactController");
const LoginController = source("controllers/loginController");
const LogoutController = source("controllers/logoutController");
const BlogController = source("controllers/blogController");
const AdminController = source("controllers/adminController");
const NotFoundController = source("controllers/notFoundController");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => console.log(`Successfully connected to MongoDB`))
  .catch((e) => console.log(`Error connecting to MongoDB: ${e}`));

const app = express();

app.set("view engine", "ejs");

app.use(express.static("static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize({}));
app.use(passport.session({}));

app.get("/", HomeController.get);
app.get("/experience", ExperienceController.get);
app.get("/education", EducationController.get);
app.get("/volunteering", VolunteerController.get);
app.get("/resume", ResumeController.get);
app.get("/contact", ContactController.get);

app.get("/blog", BlogController.get);

app.get("/login", LoginController.get);
app.post("/login", LoginController.post);

app.get("/logout", LogoutController.get);

app.get("/blog/compose", AdminController.getCompose);
app.post("/blog/compose", AdminController.postCompose);

app.get("/blog/:post", BlogController.getPost);

app.get("/blog/:post/edit", AdminController.getEdit);
app.post("/blog/:post/edit", AdminController.postEdit);
app.get("/blog/:post/delete", AdminController.getDelete);
app.post("/blog/:post/delete", AdminController.postDelete);

// 404 Errors
app.use(NotFoundController.get);

let port = process.env.PORT;
if (port == null || port === "") {
  port = 8008;
}

app.listen(port, function() {
  console.log("Server started on port " + port);
});
