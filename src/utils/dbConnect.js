const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'a0667338_warehousingServices',
  database: 'a0667338_warehousingServices',
  password: 'Dximankifib06',
});

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