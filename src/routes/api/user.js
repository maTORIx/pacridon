const Toot = require("../../models/toot");
const Collection = require("../../models/collection")
const User = require("../../models/user")

module.exports = function(app) {
  app.get("/api/user/:id", function(req, res) {
    let id = req.params.id;
    new Collection(User).where({id: id}).then((users) => {
      if(!(users.length)) {
        res.status(404).send("User not found");
        return
      }

      return users[0];
    }).then((user) => {
      res.send(user.data.nickname);
    }).catch((err) => {
      res.status(500).send(err.toString())
    })
  })
}