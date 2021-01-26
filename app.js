require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt();
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
  body: String,
  url: String
};

const BlogPost = mongoose.model("BlogPost", blogScheme);

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

app.get("/blog/compose", function(req, res) {
  res.render("compose", {
    markdown: MarkdownIt
  });
});

app.post("/blog/compose", function(req, res) {
  const blogPost = new BlogPost({
    title: _.startCase(req.body.composeTitle),
    description: req.body.composeDescription,
    body: req.body.composeBody,
    date: new Date(),
    url: req.body.composeURL
  });

  blogPost.save();

  res.redirect("/blog");
});

app.get("/blog/:post", function(req, res) {
  BlogPost.findOne({ title: _.startCase(req.params.post) }, function(err, foundPost) {
    res.render("post", {
      title: foundPost.title,
      date: foundPost.date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }),
      body: md.render(foundPost.body),
      url: foundPost.url
    });
  });
});

app.get("/blog/:post/edit", function(req, res) {
  BlogPost.findOne({ title: _.startCase(req.params.post) }, function(err, foundPost) {
    res.render("editPost", {
      renderURL: req.params.post,
      title: foundPost.title,
      date: foundPost.date,
      description: foundPost.description,
      body: foundPost.body,
      url: foundPost.url
    });
  });
});

app.post("/blog/:post/edit", function(req, res) {
  BlogPost.findOneAndUpdate({ title: _.startCase(req.params.post) }, {
    title: _.startCase(req.body.editTitle),
    description: req.body.editDescription,
    body: req.body.editBody,
    date: req.body.editDate,
    url: req.body.editURL
  }, {}, function() {
  });

  res.redirect("/blog/" + req.body.editTitle);
});

app.get("/blog/:post/delete", function(req, res) {
  BlogPost.findOne({ title: _.startCase(req.params.post) }, function(err, foundPost) {
    res.render("deletePost", {
      renderURL: req.params.post,
      title: foundPost.title,
      date: foundPost.date,
      description: foundPost.description,
      body: foundPost.body,
      url: foundPost.url
    });
  });
});

app.post("/blog/:post/delete", function(req, res) {
  BlogPost.findOneAndDelete({ title: _.startCase(req.params.post) }, {}, function() {
  });
  res.redirect("/blog");
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
