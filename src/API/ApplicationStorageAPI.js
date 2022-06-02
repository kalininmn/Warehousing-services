// Подключаем роутер и утилиту для работы с БД
const router = require(`${rootPath}/plugins/router.js`);
const db = require(`${rootPath}/utils/dbConnect.js`);


// Описываем метод и маршрут
router.get('/applicationStorage', (req, res) => {
  res.sendFile(`${rootPath}/pages/ApplicationStoragePage.html`);
});

// Описываем метод и маршрут
// async-await функции позволяют дождаться завершения какой-то операции
router.post('/v2/applicationStorage', async (req, res) => {
  const data = req.body;

  // Формируем запрос к БД и возвращаем либо ошибку, либо результат
  await new Promise((resolve, reject) => {
    db.execute(
      'INSERT INTO application_storage (mail, text) VALUES (?, ?)',
      [data.mail, data.text],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });

  res.sendStatus(200);
});

// Экспортируем модуль
module.exports = router;