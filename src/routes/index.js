const Toot = require("../models/toot");
const User = require("../models/user");
const UserSession = require("../models/user_session");

module.exports = function(app) {
  app.get("/", function(req, res) {
    if(!(res.locals.currentUser)) {
      res.redirect("/login");
      return;
    }
    res.locals.currentUser.toots().then((toots) => {
      res.render("timeline", {toots: toots.reverse()});
    }).catch((err) => {
      res.render("timeline", {error: error});
    })
  });

  app.post("/new_toot", function(req, res) {
    if(!(res.locals.currentUser)) {
      res.redirect("/login");
      return;
    }

    Toot.create(res.locals.currentUser, req.body.toot).then(() => {
      res.redirect("/");
    }).catch((err) => {
      console.log(err);
      res.render("/");
    })
  })
  require("./users")(app);
}