var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  burger.create([
    "name", "devoured"
  ], [
    req.body.name, 0
  ], function() {
    res.redirect("/");
  });
});

router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update("devoured", 1, "id", req.params.id,  function() {
    res.redirect("/");
  });
});

router.delete("/:id", function(req, res) {
  var col = "id";
  var colVal= req.params.id;
  console.log("The id is: " + req.params.id);
  burger.delete(col, colVal, function(){
    res.redirect("/");
  });
})


// Export routes for server.js to use.
module.exports = router;
