const passport = require("passport");

const LoginController = {
  get(req, res) {
    res.render("login");
  },

  post(req, res) {
    passport.authenticate("local", {}, (err, user) => {
      if (err) {
        console.log(err);
        return res.redirect("/login");
      }

      if (!user) {
        console.log("Invalid username");
        return res.redirect("/login");
      }

      req.logIn(user, (error) => {
        if (error) {
          console.log(`Error while logging in: ${err}`);
        }
      });

      return res.redirect("/blog");
    })(req, res);
  }
};

module.exports = LoginController;
