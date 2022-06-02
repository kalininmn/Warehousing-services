// Экспортируем роутер, утилиту для работы с токеном и сервис аутентификации
const router = require(`${rootPath}/plugins/router.js`);
const Token = require(`${rootPath}/utils/Token.js`);
const AuthenticationService = require(`${rootPath}/services/AuthenticationService.js`);

// Описываем метод и маршрут
router.get('/authentication', async (req, res) => {
  const { cookies } = req;
  let data = {};

  /*
    Если токен в кукисах есть -- проверяем на валидность, нет -- возвращаем false
    --> если валиден -- возвращаем true
    --> если протух -- продливаем токен --> формируем куку --> отдаём true с новым токеном
    --> если токен подменили -- возвращаем false.
  */
  if (cookies.token) {
    data = await Token.checkToken(cookies.token);

    if (data?.token && data?.user) {
      const cookieHeaders = {
        maxAge: 420000,
        sameSite: 'lax',
        httpOnly: true,
      };

      res.cookie('token', data.token, cookieHeaders);
      res.status(200).send(true);
    } else if (data?.user) {
      res.send(true);
    } else {
      res.send(false);
    }
    return;
  }

  res.send(false);
});


// Описываем метод и маршрут
router.post('/authentication', async (req, res) => {
  const form = req.body;

  /*
    Проверяем пользовательские данные
    --> не валидно -- возвращаем ошибку с сообщением "неверный пароль"
    --> валидно -- формируем access-токен и refresh-токен --> формируем куку --> отдаём токен
  */
  try {
    const userFromDB = await AuthenticationService.identification(form);
    if (!userFromDB) {
      throw new Error('Incorrect Password');
    }

    const accessToken = Token.generateAccessToken(userFromDB);
    await Token.generateRefreshToken(userFromDB);

    const cookieHeaders = {
      maxAge: 420000,
      sameSite: 'lax',
      httpOnly: true,
    };

    res.cookie('token', accessToken, cookieHeaders);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(500).send({ status: 'Error', message: 'Incorrect Password' });
  }
});

// Экспортируем модуль
module.exports = router;