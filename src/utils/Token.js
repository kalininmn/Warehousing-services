const jwt = require('jsonwebtoken');
const AuthenticationService = require('../services/AuthenticationService.js');
const TokenService = require(`${rootPath}/services/TokenService.js`);

// формирует "рандомную" строку
function randomString() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 20; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

class Token {
  static #payload = null;

  static #secret = null;

  static #accessToken = null;

  static #refreshToken = null;

  // Генерирует полезную нагрузку
  static async generatePayload(user) {
    Token.#payload = JSON.stringify(user).toString('base64');
  }

  // Возвращает секрет из .env
  static async generateSecret() {
    Token.#secret = process.env.TOKEN_SECRET.toString('base64');
  }

  // Генерирует access-токен
  static generateAccessToken(userFull) {
    const user = {
      id: userFull.id,
      login: userFull.login,
      password: userFull.password,
    };

    Token.generatePayload(user);
    Token.generateSecret();

    Token.#accessToken = jwt.sign(
      { user: Token.#payload },
      Token.#secret,
      { expiresIn: '300s' },
    );

    return Token.#accessToken;
  }

  // Генерирует refresh-токен
  static async generateRefreshToken(userFull) {
    const accessTokenStr = Token.#accessToken.toString();
    const lastSixSymbols = String.prototype.substring.call(accessTokenStr, accessTokenStr.length - 6);

    Token.#refreshToken = randomString() + lastSixSymbols;

    await TokenService.setUserRefreshToken(userFull, Token.#refreshToken);
  }

  // Проверяет токен на валидность
  static async checkToken(accessTokenFromClient) {
    return jwt.verify(accessTokenFromClient, Token.#secret, async (err, decoded) => {
      let userFromJson = null;

      if (err) {
        if (err.message === 'jwt expired') {
          const { user: userInJson } = jwt.decode(accessTokenFromClient);
          userFromJson = JSON.parse(userInJson);

          const accessTokenStr = accessTokenFromClient.toString();
          const lastSixSymbolsAccess = String.prototype.substring
            .call(accessTokenStr, accessTokenStr.length - 6);

          const userFromDBFull = await AuthenticationService.getUser(userFromJson.id);
          const refreshTokenStr = userFromDBFull.refreshToken.toString();
          const lastSixSymbolsRefresh = String.prototype.substring
            .call(refreshTokenStr, refreshTokenStr.length - 6);

          if (lastSixSymbolsAccess === lastSixSymbolsRefresh) {
            await Token.generateAccessToken(userFromJson);
            await Token.generateRefreshToken(userFromJson);

            return { token: Token.#accessToken, user: userFromJson };
          }
        }
        return null;
      }
      userFromJson = JSON.parse(decoded.user);
      return { user: userFromJson };
    });
  }

  // Возвращает пользователя из токена
  static async returnUser(accessTokenFromClient) {
    const result = await Token.checkToken(accessTokenFromClient);
    const user = result?.user;

    if (user) {
      return user;
    }

    return false;
  }
}

module.exports = Token;