const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

app.use(express.static("static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/experience", function(req, res){
  res.sendFile(path.join(__dirname, "/static/experience.html"));
});

app.get("/education", function(req, res){
  res.sendFile(path.join(__dirname, "/static/education.html"));
});

app.get("/volunteering", function(req, res){
  res.sendFile(path.join(__dirname, "/static/volunteering.html"))
});

app.get("/resume", function(req, res) {
  res.sendFile(path.join(__dirname, "/static/resume.html"))
});

app.get("/contact", function(req, res) {
  res.sendFile(path.join(__dirname, "/static/contact.html"))
});

// app.get("/about", function(req, res) {
//   res.sendFile(path.join(__dirname, "/static/about.html"))
// });

// 404 Errors
app.use(function (req, res, next) {
  res.status(404).sendFile(path.join(__dirname, "/static/404.html"))
})

app.listen(8008, function(){
  console.log("Server started on port 8008");
});
