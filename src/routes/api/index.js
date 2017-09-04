const express = require("express");
module.exports = function(app) {
  let router = app.route("/api");

  require("./timeline")(app);
  require("./toots")(app);
  require("./user")(app);
  require("./followings")(app);
}