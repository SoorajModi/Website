require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const MarkdownIt = require("markdown-it");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const md = new MarkdownIt();
const app = express();

app.set("view engine", "ejs");

app.use(express.static("static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize({}));
app.use(passport.session({}));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log(`Successfully connected to MongoDB`))
  .catch((e) => console.log(`Error connecting to MongoDB: ${e}`));

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now },
  body: String,
  url: String
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

userSchema.plugin(passportLocalMongoose); // Used to hash and salt users, and save to MongoDB

const BlogPost = mongoose.model("BlogPost", blogSchema);
const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// User.register({username: process.env.USERNAME}, process.env.PASSWORD, function(err) {
//   if(err) {
//     console.log("Error: " + err);
//   } else {
//     console.log("Successfully added user");
//   }
// });

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/experience", function(req, res) {
  res.render("experience");
});

app.get("/blog", function(req, res) {
  BlogPost.find({}, function(err, foundBlogPost) {
    res.render("blog", {
      blog: foundBlogPost
    });
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
    const blogPost = new BlogPost({
      title: _.startCase(req.body.composeTitle),
      description: req.body.composeDescription,
      body: req.body.composeBody,
      date: new Date(),
      url: (req.body.composeTitle).replace(/\s+/g, "-").toLowerCase()
    });

    blogPost.save(() => console.log("New blog post added: " + req.body.composeTitle));
    res.redirect("/blog");
  }
});

app.get("/blog/:post", function(req, res) {
  BlogPost.findOne({ url: req.params.post }, function(err, foundPost) {
    if (!err && foundPost) {
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
    } else {
      res.redirect("/404");
    }
  });
});

app.get("/blog/:post/edit", function(req, res) {
  if (req.isAuthenticated()) {
    BlogPost.findOne({ url: req.params.post }, function(err, foundPost) {
      if (!foundPost || err) {
        res.redirect("/404");
      } else {
        res.render("editPost", {
          url: foundPost.url,
          title: foundPost.title,
          date: foundPost.date,
          description: foundPost.description,
          body: foundPost.body
        });
      }
    });
  } else {
    res.redirect("/blog/" + req.params.post);
  }
});

app.post("/blog/:post/edit", function(req, res) {
  if (req.isAuthenticated()) {
    let newTitle = _.startCase(req.body.editTitle);
    let newURL = (req.body.editTitle).replace(/\s+/g, "-").toLowerCase();

    BlogPost.findOneAndUpdate({ url: req.params.post }, {
      title: newTitle,
      description: req.body.editDescription,
      body: req.body.editBody,
      date: req.body.editDate,
      url: newURL
    }, {}, (err) => {
      if (!err) {
        console.log("Successfully edited blog post: " + newTitle);
      } else {
        console.log("Error: could not update blogpost: " + err);
      }
    });

    res.redirect("/blog/" + newURL);
  } else {
    res.redirect("/blog/" + req.params.post);
  }
});

app.get("/blog/:post/delete", function(req, res) {
  if (req.isAuthenticated()) {
    BlogPost.findOne({ url: req.params.post }, function(err, foundPost) {
      if (!err && foundPost) {
        return res.render("deletePost", {
          renderURL: req.params.post,
          title: foundPost.title,
          date: foundPost.date,
          description: foundPost.description,
          body: foundPost.body
        });
      } else {
        console.log("Error: could not delete post, not found");
        res.redirect("/blog/" + req.params.post);
      }
    });
  } else {
    res.redirect("/blog/" + req.params.post);
  }
});

app.post("/blog/:post/delete", function(req, res) {
  if (req.isAuthenticated()) {
    BlogPost.findOneAndDelete({ url: req.params.post }, {}, (err, doc) => {
      if (!err) {
        console.log("Successfully deleted blog post: " + doc.title);
      } else {
        console.log("Error trying to delete blog post: " + err);
      }
    });

    res.redirect("/blog");
  } else {
    res.redirect("/blog/" + req.params.post);
  }
});

app.get("/education", function(req, res) {
  res.render("education");
});

app.get("/volunteering", function(req, res) {
  res.render("volunteering");
});

app.get("/resume", function(req, res) {
  res.render("resume");
});

app.get("/contact", function(req, res) {
  res.render("contact");
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
