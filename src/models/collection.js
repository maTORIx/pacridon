const db = require("../db");

class Collection {
  constructor(klass) {
    this.klass = klass;
    this._where = {};
    this._order = {};
    this._limit = undefined;
    this._offset = undefined;
  }

  clone() {
    let cloned = new this.constructor(this.klass);
    cloned.where = Object.assign({}, this._where);
    cloned.order = Object.assign({}, this._order);
    cloned.limit = this.limit;
    cloned._offset = this._offset;
    return cloned;
  }

  where(value) {
    let assigned = this.clone();
    assigned._where = Object.assign(assigned._where, value);
    return assigned;
  }

  then(f) {
    let sqlParts = [`SELECT * FROM ??`];
    let sqlValues = [this.klass.tableName()];
    if(Object.keys(this._where).length > 0) {
      sqlParts.push("WHERE ?");
      sqlValues.push(this._where);
    }
    return new Promise((resolve, reject) => {
      db.query(sqlParts.join(" "), sqlValues).then((result) => {
        let fields = result[1];
        let rows = result[0];
        let records = rows.map((row) => {
          return new this.klass(row);
        });
        resolve(records);
      }).catch((err) => {
        reject(err);
      })
    }).then(f);
  }
}

module.exports = Collection;