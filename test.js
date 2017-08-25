const UserSession = require("./src/models/user_session");
const Toot = require("./src/models/toot")
const User = require("./models/user")

// let session = new UserSession({ user_id: 1});
// session.save().then((s) => {
//   console.dir(s);
//   s.data.user_id = 3;
//   s.save().then((ss) => {
//     console.dir(ss);
//   })
// })

for(var i = 0;i < 100;i++) {
  User.authenticate("aaa@aaa.aaa", "aaa").then((user) => {
    return Toot.create(user, i)
  }).catch((err) => {
    console.error(err)
  })
}