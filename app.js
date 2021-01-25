require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
}).then((r) => console.log(`Successfully connected to MongoDB: ${r}`))
  .catch((e) => console.log(`Error starting up mongo: ${e}`));

const blogScheme = {
  title: String,
  description: String,
  date: { type: Date, default: Date.now },
  body: [String],
  url: String
};

const BlogPost = mongoose.model("BlogPost", blogScheme);

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/experience", function(req, res) {
  res.render("experience");
});

// app.get("/blog", function(req, res) {
//   BlogPost.find({}, function(err, foundBlogPosts) {
//     res.render("blog", {
//       blog: foundBlogPosts
//     });
//   });
// });

// app.get("/blog/compose", function(req, res) {
//   res.render("compose");
// });

// app.post("/blog/compose", function(req, res) {
//   const blogPost = new BlogPost({
//     title: _.startCase(req.body.composeTitle),
//     description: req.body.composeDescription,
//     body: req.body.composeBody,
//     date: new Date(),
//     url: req.body.composeURL
//   });
//
//   blogPost.save();
//
//   res.redirect("/blog");
// });

// app.get("/blog/:post", function(req, res) {
//   BlogPost.findOne({ title: _.startCase(req.params.post) }, function(err, foundPost) {
//     res.render("post", {
//       title: foundPost.title,
//       date: foundPost.date.toLocaleDateString("en-US", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric"
//       }),
//       body: foundPost.body,
//       url: foundPost.url
//     });
//   });
// });

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
