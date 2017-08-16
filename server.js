var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var exHandlebars = require("express-handlebars");

var app = express();
var port = process.env.PORT || 3000;

var db = require("./models");

//Add middleware to the Express instance that parses the body of the incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Use handlebars as view engine, and set default layout to main.handlebars
app.engine("handlebars", exHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./routes/burger-routes.js")(app);

db.sequelize.sync({ force: true }).then(function() {
  app.listen(port, function() {
    console.log("App listening on PORT " + port);
  });
});