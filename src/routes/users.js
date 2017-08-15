var crypto = require('crypto');
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
    
    // console.log(hashData, email)
    // app.locals.db.query(
    //   "INSERT INTO `users` (`email`, `password`, `salt`, `nickname`) VALUES (?, ?, ?, ?)",
    //   [email, hashData, salt, nickname]
    //  ).then((data) => {
    //    res.redirect(302, "/login");
    //  }).catch((err) => {
    //    console.log(err);
       
    //  })
  });
  app.get("/login", function(req, res) {
    res.render("login");
  });
  app.post("/login", function(req, res) {
    var password = req.body.password;
    var email = req.body.email;
    app.locals.db.query(
      "SELECT * FROM `users` WHERE `email` = ? LIMIT 1",
      [email]
      ).then((results) => {
        // console.log(results);
        if(results.length < 1) {
          res.render("login");
          return;
        }
        console.log("OK2")
        let user = results[0][0];
        console.log(user);
        let salt = user.salt;
        console.log(salt);
        var hash = crypto.createHash("sha512");
        console.log("OK3")
        hash.update(salt);
        console.log("OK1")
        hash.update(password);
        console.log("OK1")
        var hashData = hash.digest("hex");
        console.log("OK1")

        if(hashData !== user.password) {
          res.render("login");
          return;
        }

        // res.cookie("userID", user.id);
        res.send("SUCCESS");
      }).catch((err) => {
        console.log(err);
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