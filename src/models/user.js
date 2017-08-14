const db = require('../db');
const Record = require("./record");
const Collection = require("./collection");
const Toot = require("./toot")

class User extends Record{
  static tableName() {
    return "users";
  }
  static columns() {
    return ["nickname"];
  }

  toots() {
    console.log([1,2].reverse().reverse());
    return (new Collection(Toot)).where({user_id: this.data.id});
  }
}

module.exports = User;
