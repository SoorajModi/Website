const source = require("rfr");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const userRoutes = source("routes/userRoutes");
const adminRoutes = source("routes/adminRoutes");
source("models/user");    // Load model

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
app.use('/', adminRoutes);
app.use('/', userRoutes);

module.exports = app;