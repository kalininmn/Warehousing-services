const mysql = require('mysql2');

// Описание данных БД для подключения
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'warehousingServices',
  password: 'Dximankifib06',
});

// Подключение
db.connect((err) => {
  if (err) {
    return console.error(`Ошибка: ${err.message}`);
  }
  console.log('Connected');
  return null;
});

// connection.end(function(err) {
//   if (err) {
//     return console.log("Ошибка: " + err.message);
//   }
//   console.log("Closed");
// });

module.exports = db;