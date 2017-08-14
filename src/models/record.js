const db = require("../db");
class Record {
  static find(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM `users` WHERE `id` = ? LIMIT 1;",
        [id]
      ).then((result) => {
        let rows = result[0];
        let fields = result[1];
        if(rows.length < 1) {
          reject(new Error(`User(${id}) is not found`));
          return;
        }
        resolve(new User(rows[0]));
      }).catch((error) => {
        reject(error);
      })
    });
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
        "INSERT INTO `users` () VALUES ();"
      ).then((result) => {
        let info = result[0];
        let fields = result[1];
        this.data.id = info.insertId;
        resolve(this);
      }).catch((error) => {
        reject(error);
      })
    })
  }
}

module.exports = Record;