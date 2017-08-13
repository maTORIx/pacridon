const db = require("../db");

class User{
  static find(id) {
  }
  constructor(data) {
    this.data = data;
  }

  save() {
    if(this.data.id) {
      return this.update();
    } else {
      return this.insert();
    }
  }

  insert() {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO `users` () VALUES ()",
      ).then((result) => {
        let info = result[0];
        let fields = result[1];
        this.data.id = info.insertId;
        resolve(this);
      }).catch((error) => {
        reject(error);
      });
    })
  }
}

module.exports = User;