const source = require("rfr");
require("dotenv").config();
source("models/user");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const MarkdownIt = require("markdown-it");
const session = require("express-session");
const passport = require("passport");
const md = new MarkdownIt();
const app = express();
const { getPosts, getOnePost, createPost, updatePost, deletePost } = source("models/blogPost");
const HomeController = source("controllers/homeController");
const ExperienceController = source("controllers/experienceController");
const EducationController = source("controllers/educationController");
const VolunteerController = source("controllers/volunteerController");
const ResumeController = source("controllers/resumeController");
const ContactController = source("controllers/contactController");

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

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => console.log(`Successfully connected to MongoDB`))
  .catch((e) => console.log(`Error connecting to MongoDB: ${e}`));

app.get("/", HomeController.get);
app.get("/experience", ExperienceController.get);
app.get("/education", EducationController.get);
app.get("/volunteering", VolunteerController.get);
app.get("/resume", ResumeController.get);
app.get("/contact", ContactController.get);

app.get("/blog", function(req, res) {
  getPosts({}).then((foundPosts) => {
    res.render("blog", {
      blog: foundPosts
    });
  }).catch((err) => {
    console.log(err);
    res.redirect("/404");
  });
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.post("/login", function(req, res) {
  passport.authenticate("local", {}, function(err, user) {
    if (err) {
      console.log(err);
      return res.redirect("/login");
    }

    if (!user) {
      console.log("Invalid username");
      return res.redirect("/login");
    }

    req.logIn(user, function(err) {
      if (err) {
        console.log("Error while logging in: " + err);
      }
      return res.redirect("/blog");
    });
  })(req, res);
});

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/blog");
});

app.get("/blog/compose", function(req, res) {
  if (req.isAuthenticated()) {
    res.render("compose", {
      markdown: MarkdownIt
    });
  } else {
    res.redirect("/404");
  }
});

app.post("/blog/compose", function(req, res) {
  if (req.isAuthenticated()) {
    createPost(req);
    res.redirect("/blog");
  }
});

app.get("/blog/:post", function(req, res) {
  getOnePost({ url: req.params.post }).then(foundPost => {
    res.render("post", {
      title: foundPost.title,
      date: foundPost.date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }),
      body: md.render(foundPost.body)
    });
  }).catch(err => {
    console.log(err);
    res.redirect("/404");
  });
});

app.get("/blog/:post/edit", function(req, res) {
  if (req.isAuthenticated()) {
    getOnePost({ url: req.params.post }).then(foundPost => {
      res.render("editPost", {
        url: foundPost.url,
        title: foundPost.title,
        date: foundPost.date,
        description: foundPost.description,
        body: foundPost.body
      });
    }).catch(err => {
      console.log(err);
      res.redirect("/404");
    });
  } else {
    res.redirect("/404");
  }
});

app.post("/blog/:post/edit", function(req, res) {
  if (req.isAuthenticated()) {
    let newTitle = _.startCase(req.body.editTitle);
    let newURL = (req.body.editTitle).replace(/\s+/g, "-").toLowerCase();

    updatePost({ url: req.params.post }, {
      title: newTitle,
      description: req.body.editDescription,
      body: req.body.editBody,
      date: req.body.editDate,
      url: newURL
    });

    res.redirect("/blog/" + newURL);
  } else {
    res.redirect("/blog/" + req.params.post);
  }
});

app.get("/blog/:post/delete", function(req, res) {
  if (req.isAuthenticated()) {
    getOnePost({ url: req.params.post })
      .then(foundPost => res.render("deletePost", {
        renderURL: req.params.post,
        title: foundPost.title,
        date: foundPost.date,
        description: foundPost.description,
        body: foundPost.body
      }))
      .catch(e => {
        console.log(e);
        res.redirect("/404");
      });
  } else {
    res.redirect("/blog/" + req.params.post);
  }
});

app.post("/blog/:post/delete", function(req, res) {
  if (req.isAuthenticated()) {
    deletePost({ url: req.params.post });
    res.redirect("/blog");
  } else {
    res.redirect("/blog/" + req.params.post);
  }
});

// 404 Errors
app.use(function(req, res) {
  res.render("404");
});

let port = process.env.PORT;
if (port == null || port === "") {
  port = 8008;
}

app.listen(port, function() {
  console.log("Server started on port " + port);
});
