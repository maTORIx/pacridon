const Following = require("../../models/user_following");
const Collection = require("../../models/collection")
const User = require("../../models/user")

module.exports = function(app) {
  app.post("/followings/:id", function(req, res) {
    if(!res.locals.currentUser){
      res.status(401).json({"error": "Unauthorized"});
      return;
    }

    targetId = req.params.id;

    Following.create(res.locals.currentUser, targetId).then((following) => {
      res.json({following: following.data});
    }).catch((err) => {
      console.log(err);
      res.status(500).json({error: err.toString()});
    })
  })
}