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

app.post("/experience", function(req, res){
  res.sendFile(path.join(__dirname, "/static/html/work_experience.html"));
});

app.listen(8008, function(){
  console.log("Server started on port 8008");
});
