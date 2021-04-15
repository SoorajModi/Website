const mongoose = require("mongoose");
const passport = require("passport");
const schema = require("./schema");

const AdminModel = mongoose.model("users", schema);

class Admin {
}

passport.use(AdminModel.createStrategy());
passport.serializeUser(AdminModel.serializeUser());
passport.deserializeUser(AdminModel.deserializeUser());

module.exports = {
  Admin
};
