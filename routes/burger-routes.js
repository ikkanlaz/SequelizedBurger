var db = require("../models");

// Export routes for server.js to use.
module.exports = function (app) {
  app.get("/", function (req, res) {
    db.Burger.findAll({}).then(function (dbPost) {
      console.log(JSON.parse(JSON.stringify(dbPost))[0]);
      var hbsObject = {
      burgers: dbPost
    };
      res.render("index", JSON.parse(JSON.stringify(hbsObject)));
    });
  });

  app.post("/", function (req, res) {
    db.Burger.create(req.body).then(function (dbPost) {
      res.redirect("/");
    });
  });

  app.put("/:id", function (req, res) {
    db.Burger.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }).then(function () {
        res.redirect("/");
      });
  });
}
