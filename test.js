const User = require("./src/models/user");

let user = new User({});
user.save().then((u) => {
  console.log(u);
  console.log(u.data);
});