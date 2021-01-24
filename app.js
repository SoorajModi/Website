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

// const proj = new BlogPost({
//   title: "",
//   description: "Test post description",
//   body: ["Test body content", "Test body content 2", "Test body content 3", "Test Body content 4"],
//   url: "www.test.com"
// });
//
// proj.save(function (err) {
//   if(err) console.log("Failed MongoDB save");
// });

// ProjectPost.updateOne({ title: 'Test' }, { title: 'test' }, function(err, res) {
//   // Updated at most one doc, `res.modifiedCount` contains the number
//   // of docs that MongoDB updated
// });


app.get("/", function(req, res) {
  res.render("home");
});

app.get("/experience", function(req, res) {
  res.render("experience");
});

app.get("/blog", function(req, res) {
  BlogPost.find({}, function(err, foundBlogPosts) {
    res.render("blog", {
      blog: foundBlogPosts
    });
  });
});

app.get("/blog/:post", function(req, res) {
  BlogPost.findOne({ title: req.params.post }, function(err, foundPost) {
    res.render("post", {
      title: _.startCase(foundPost.title),
      date: foundPost.date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      body: foundPost.body,
      url: foundPost.url
    });
  });
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
