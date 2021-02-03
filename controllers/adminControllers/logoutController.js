const LogoutController = {
  get(req, res) {
    req.logout();
    res.redirect('/blog');
  },
};

module.exports = LogoutController;
