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

    // User.collection().where({email: email}).then((users) => {
    //   if(users.length < 1) {
    //     throw new Error("User not found");
    //   }

    //   let user = users[0];
    //   let salt = user.data.salt;
    //   var hash = crypto.createHash("sha512");
    //   hash.update(salt);
    //   hash.update(password);
    //   var hashData = hash.digest("hex");

    //   if(hashData !== user.data.password) {
    //     throw new Error("password is not match");
    //   }

    //   let session = new UserSession({user_id: user.data.id});

    //   return session.save();
    // }).then((session) => {
    //   res.cookie("session_id", session.data.id, {
    //     path: "/",
    //     httpOnly: true,
    //     expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)),
    //     signed: true
    //   });
    //   res.redirect("/");
    // }).catch((err) => {
    //   res.render("login", {error: true});
    // })
  });

  // app.get("/logout", function(req, res) {
  //   res.cookie("userID", undefined);
  //   res.redirect("/login")
  // });

  // app.get("/users/:id", function(req, res) {
  //   let id = req.params.id;
  //   app.locals.db.query(
  //     "SELECT * FROM `articles` WHERE `user_id` = ? ",
  //     [id],
  //     function(error, result, render) {
  //       let articles = result;
  //       res.render("articles", {articles: articles})
  //     });
  // })
}