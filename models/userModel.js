const mongoose = require('mongoose');

const { Schema } = mongoose;
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  username: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose); // Used to hash and salt users, and save to MongoDB

const UserModel = mongoose.model('User', userSchema);

passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());
