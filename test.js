const Collection = require("./src/models/collection");
const User = require("./src/models/user")

// let session = new UserSession({ user_id: 1});
// session.save().then((s) => {
//   console.dir(s);
//   s.data.user_id = 3;
//   s.save().then((ss) => {
//     console.dir(ss);
//   })
// })

new Collection(User).where({id: 1}).then((users) => {
  users.forEach(function(element) {
    console.log(element);
  });
}).catch((err) => {
  console.log(err)
})