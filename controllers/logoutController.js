const LogoutController = {
  get: function(req, res) {
    req.logout();
    res.redirect("/blog");
  }
};

module.exports = LogoutController;