const crypto = require('crypto');
const User = require("../models/user");
const Collection = require("../models/collection");
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
    var salt = crypto.randomBytes(8).toString("hex");
    var hash = crypto.createHash("sha512");
    console.log(salt);
    hash.update(salt);
    hash.update(password);
    var hashData = hash.digest("hex");

    user = new User({password: hashData, email: email, nickname: nickname, salt: salt})
    user.save().then((result) => {
      res.redirect(302, "/login");
    }).catch((err) => {
      console.log(err);
      res.status(409).send("nickname または email アドレスが重複しています。");
    })
  });
  app.get("/login", function(req, res) {
    res.render("login");
  });
  app.post("/login", function(req, res) {
    var password = req.body.password;
    var email = req.body.email;
    var user = (new Collection(User)).where({email: email}).then((user) => {
      if(user.length != 0){
        var data = user[0].data;
        var salt = data.salt;
        console.log(data);
        var hash = crypto.createHash("sha512");
        hash.update(salt);
        hash.update(password);
        var hashData = hash.digest("hex");
        if(data.password === hashData) {
          res.cookie("userID", data.id);
          res.send("SUCCESS");
        } else {
          res.redirect("/login");
        }
      } else {
        res.redirect("/login")
      }
    }).catch((err) => {
      res.redirect("/login")
    })
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