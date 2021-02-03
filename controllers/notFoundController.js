const NotFoundController = {
  get: function(req, res) {
    res.render("404");
  }
};

module.exports = NotFoundController;