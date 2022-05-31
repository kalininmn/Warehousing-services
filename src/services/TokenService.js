const db = require(`${rootPath}/utils/dbConnect.js`);

class TokenService {
  static async setUserRefreshToken(userFull, refreshToken) {
    return new Promise((resolve, reject) => {
      db.execute(
        'UPDATE users SET refreshToken = ? WHERE id = ?',
        [refreshToken, userFull.id],
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        },
      );
    });
  }
}

module.exports = TokenService;