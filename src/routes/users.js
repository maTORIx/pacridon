const crypto = require('crypto');
const User = require("../models/user");
const Collection = require("../models/collection");
const UserSession = require("../models/user_session");
module.exports = function(app) {
  function createSolt() {
    var result = "";
    for(var i = 0;i < 16;i++) {
      random = Math.floor(Math.random() * 126 + 17);
      result += String.fromCharCode(random);
    }
    return result;
  }

  app.get("/signup", function(req, res) {
    res.render("signup");
  });
  app.post("/signup", function(req, res) {
    var password = req.body.password;
    var email = req.body.email;
    var nickname = req.body.nickname;
    User.create(nickname, email, password).then(() => {
      res.redirect("/login");
    }).catch((err) => {
      console.log(err);
      res.redirect("/signup");
    });
  });
  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.post("/login", function(req, res) {
    var password = req.body.password;
    var email = req.body.email;

    User.authenticate(email, password).then((user) => {
      return UserSession.create(user);
    }).then((session) => {
      console.log("OK");
      res.cookie("session_id", session.data.id, {
        path: "/",
        httpOnly: true,//http接続の時のみしか見ることができないCookie
        expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)),//期限
        signed: true
      });
      res.redirect("/");
    }).catch((err) => {
      console.log(err);
      console.log("NOT OK");
      res.render("login", {error: true});
    })
  });
}