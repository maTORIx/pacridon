const db = require("../db");
const Record = require("./record");
const redis = require("../redis");

class UserSession extends Record {
  static tableName() {
    return "user_followings";
  }

  static columns() {
    return ["user_id", "target_id"];
  }

  static create(user, target_id) {
    return new this({user_id: user.data.id, target_id : target_id}).save();
  }
}

module.exports = UserSession;