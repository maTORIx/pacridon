const User = require("./src/models/user");

User.find(1).then((user) => {
  console.log(user);
  user.toots().where({user_id: 1}).where({id: 1}).then((toots) => {
    console.log(toots.length);
    console.dir(toots);
  })
})
process.on('unhandledRejection', console.dir);