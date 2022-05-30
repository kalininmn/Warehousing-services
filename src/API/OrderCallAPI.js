const router = require(`${rootPath}/plugins/router.js`);
const db = require(`${rootPath}/utils/dbConnect`);

router.get('/orderCall', (req, res) => {
  res.sendFile(`${rootPath}/pages/OrderCallPage.html`);
});

router.post('/v2/orderCall', async (req, res) => {
  const data = req.body;

  await new Promise((resolve, reject) => {
    db.execute(
      'INSERT INTO order_call (phone) VALUES (?)',
      [data.phone],
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