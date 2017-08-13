// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
  all: function(cb) {
    orm.all("burgers", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objKey, objValue, conditionKey, conditionValue, cb) {
    orm.update("burgers", objKey, objValue, conditionKey, conditionValue, function(res) {
      cb(res);
    });
  },
  delete: function(col, colVal, cb) {
    orm.delete("burgers", col, colVal, function(res) {
      cb(res);
    });
  },

};

// Export the database functions for the controller (burgerController.js).
module.exports = burger;
