const db = require(`${rootPath}/utils/dbConnect.js`);

class AuthenticationService {
  static async identification(data) {
    const { login, password } = data;

    return new Promise((resolve, reject) => {
      db.execute(
        'SELECT * FROM users WHERE login = ? AND password = ?',
        [login, password],
        (error, result) => {
          if (error) reject(error);
          resolve(result[0]);
        },
      );
    });
  }

  static async getUser(id) {
    return new Promise((resolve, reject) => {
      db.execute(
        'SELECT * FROM users WHERE id = ?',
        [id],
        (error, result) => {
          if (error) reject(error);
          resolve(result[0]);
        },
      );
    });
  }
}

module.exports = AuthenticationService;