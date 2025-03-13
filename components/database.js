export class Database {
  constructor(SQLite) {
    this.currentTime = new Date();
    this.SQLite = SQLite;
    this.db = null;
  }

  getDbContents() {
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '/static/db.sqlite', true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = (e) => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(new Uint8Array(xhr.response));
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
          });
        }
      };
      xhr.onerror = function() {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
      };
      xhr.send();
    });
  }

  async init() {
    try {
      const contents = await this.getDbContents();
      this.db = new this.SQLite.Database(contents);
    } catch (error) {
      console.error("Error initializing database:", error);
    }
  }

  exec(query) {
    try {
      query.result = this.db.exec(query.query);
      query.error = undefined;
      if (!query.result[0]) {
        query.result = undefined;
        query.error = "that's a valid query, but it didn't return any results :(";
      }
    } catch (error) {
      console.log(error);
      console.log(query.query);
      query.result = undefined;
      query.error = error.message;
    }
  }
}
