const router = require(`${rootPath}/plugins/router.js`);
const db = require(`${rootPath}/utils/dbConnect`);

router.get('/applicationStorage', (req, res) => {
  res.sendFile(`${rootPath}/pages/ApplicationStoragePage.html`);
});

router.post('/v2/applicationStorage', async (req, res) => {
  const data = req.body;

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

module.exports = router;