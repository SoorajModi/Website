const mongoose = require("mongoose");
const schema = require("./schema");
const passport = require("passport");

const AdminModel = mongoose.model("users", schema);

class Admin {
  constructor() {
    this._model = new AdminModel();
  }

  get username() {
    return this._model.title;
  }

  save() {
    return this._model.save().then(() => this);
  }

  static getAll() {
    return AdminModel.find({})
      .then((vol) => vol.map((v) => {
        const vol = new Admin();
        vol._model = v;
        return vol;
      }));
  }
}

passport.use(AdminModel.createStrategy());
passport.serializeUser(AdminModel.serializeUser());
passport.deserializeUser(AdminModel.deserializeUser());

module.exports = {
  Admin: Admin
};
