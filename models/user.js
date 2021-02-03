const mongoose = require("mongoose");
const { Schema } = mongoose;
const _ = require("lodash");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username: String,
  password: String
});

userSchema.plugin(passportLocalMongoose); // Used to hash and salt users, and save to MongoDB

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());