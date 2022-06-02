// Подключаем роутер
const router = require(`${rootPath}/plugins/router.js`);

// Описываем метод и маршрут
router.get('/aboutCompany', (req, res) => {
  res.sendFile(`${rootPath}/pages/AboutCompanyPage.html`);
});


// Экспортируем модуль
module.exports = router;