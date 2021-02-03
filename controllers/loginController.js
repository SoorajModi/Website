const passport = require("passport");

const LoginController = {
  get: function(req, res) {
    res.render("login");
  },

  post: function(req, res) {
    passport.authenticate("local", {}, function(err, user) {
      if (err) {
        console.log(err);
        return res.redirect("/login");
      }

      if (!user) {
        console.log("Invalid username");
        return res.redirect("/login");
      }

      req.logIn(user, function(err) {
        if (err) {
          console.log("Error while logging in: " + err);
        }
        return res.redirect("/blog");
      });
    })(req, res);
  }
};

module.exports = LoginController;