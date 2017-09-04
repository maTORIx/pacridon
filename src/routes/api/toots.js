const Toot = require("../../models/toot");
const Collection = require("../../models/collection")
const User = require("../../models/user")

module.exports = function(app) {
  app.get("/api/toots", function(req, res) {
    if(!res.locals.currentUser){
      res.status(401).json({"error": "Unauthorized"});
      return;
    }

    res.locals.currentUser.toots().order("id", "desc").then((toots) => {
      res.json(toots.map((toot) => {
        return toot.data;
      }))
    }).catch((error) => {
      res.status(500).json({ error: error.toString });
    }) 
  })

  app.get("/api/toots/all", function(req, res) {
    if(!res.locals.currentUser){
      res.status(401).json({"error": "Unauthorized"});
      return;
    }

    db.query(
      "SELECT * FROM `toots`"
    ).then((users) => {
      
    })
  })

  app.post("/api/toots", function(req, res) {
    if(!res.locals.currentUser){
      res.status(401).json({"error": "Unauthorized"});
      return;
    }

    Toot.create(res.locals.currentUser, req.body.toot).then((toot) => {
      res.json({toot: toot.data});
    }).catch((err) => {
      console.log(err);
      res.status(500).json({error: err.toString()});
    })
  })

  app.delete("/api/toots/:id", function(req, res) {
    if(!res.locals.currentUser){
      res.status(401).json({"error": "Unauthorized"});
      return;
    }

    res.locals.currentUser.toots().where({
      id: req.params.id
    }).then((toots) => {
      if(toots.length > 0) {
        toots[0].destroy();
      }
      res.status(200).end();
    }).catch((err) => {
      res.status(500).json({"error": err.toString()});
    })
  })

  app.get("/api/:user/toots", function(req, res) {
    new Collection(User).where({nickname: req.params.user}).then((users) => {
      if(!(users.length)) {
        res.status("404").send("User not found");
        return;
      }
      users[0].toots().order("id", "desc").then((toots) => {
      res.json(toots.map((toot) => {
        return toot.data;
      }))
      }).catch((error) => {
        res.status(500).json({ error: error.toString });
      }) 
    }).catch((err) => {
      console.error(err);
    })
  })
}