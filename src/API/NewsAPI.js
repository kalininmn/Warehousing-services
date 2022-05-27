const router = require(`${rootPath}/plugins/router.js`);
const db = require(`${rootPath}/utils/dbConnect`);

router.get('/news', (req, res) => {
  res.sendFile(`${rootPath}/pages/NewsPage.html`);
});

router.get('/v2/news', async (req, res) => {
  const news = await new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM news',
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });

  res.send(news);
});

router.post('/v2/news', async (req, res) => {
  const card = req.body;
  
  await new Promise((resolve, reject) => {
    db.execute(
      'INSERT INTO news (title, description) VALUES (?, ?)',
      [card.title, card.description],
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

router.put('/v2/news', async (req, res) => {
  const card = req.body;
  
  await new Promise((resolve, reject) => {
    db.execute(
      'UPDATE news SET title = ?, description = ? WHERE id = ?',
      [card.title, card.description, card.id],
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


module.exports = router;