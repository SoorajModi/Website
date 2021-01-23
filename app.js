require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
}).then((r) => console.log(`Successfully connected to MongoDB: ${r}`))
  .catch((e) => console.log(`Error starting up mongo: ${e}`));

const projectScheme = {
  title: String,
  body: String,
  date: { type: Date, default: Date.now },
};

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/experience", function (req, res) {
  res.render("experience");
});

app.get("/projects", function (req, res) {
  res.render("projects");
});

app.get("/projects/citationbot", function(req, res) {
  res.render("citationbot");
});

app.get("/education", function (req, res) {
  res.render("education");
});

app.get("/volunteering", function (req, res) {
  res.render("volunteering");
});

app.get("/resume", function (req, res) {
  res.render("resume");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

// 404 Errors
app.use(function (req, res) {
  res.render("404");
});

let port = process.env.PORT;
if (port == null || port === "") {
  port = 8008;
}

app.listen(port, function () {
  console.log("Server started on port " + port);
});
