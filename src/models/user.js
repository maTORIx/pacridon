const db = require('../db');
const Record = require("./record");
const Collection = require("./collection");
const Toot = require("./toot")
const crypto = require("crypto");

class User extends Record{
  static tableName() {
    return "users";
  }
  static columns() {
    return ["nickname", "password", "email", "salt"];
  }

  toots() {
    return (new Collection(Toot)).where({user_id: this.data.id});
  }

  static create(nickname, email, raw_password) {
    return new Promise((resolve, reject) => {
      var salt = crypto.randomBytes(8).toString("hex");
      var hash = crypto.createHash("sha512");
      hash.update(salt);
      hash.update(raw_password);
      var hashed_password = hash.digest("hex");

      let user = new this({
        password: hashed_password,
        email: email,
        nickname: nickname,
        salt: salt,
      });
      user.save().then(() => {
        resolve(user);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  static authenticate(email, raw_password) {
    return new Promise((resolve, reject) => {
      this.collection().where({email: email}).then((users) => {
        if(users.length < 1) {
          throw new Error("User not found");
        }

        let user = users[0];
        let salt = user.data.salt;
        var hash = crypto.createHash("sha512");
        hash.update(salt);
        hash.update(raw_password);
        var hashed_password = hash.digest("hex");

        if(hashed_password !== user.data.password) {
          throw new Error("password is not match");
        }
        resolve(user);
      }).catch((err) => {
        reject(err);
      })
    })
  }
}

module.exports = User;
