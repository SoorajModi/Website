const express = require("express");
const bodyParser = require("body-parser")
const ejs = require("ejs");
// const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/about", function(req, res) {
  res.redirect("/");
});

app.get("/experience", function(req, res) {
  res.render("experience");
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

app.listen(8008, function(){
  console.log("Server started on port 8008");
});
