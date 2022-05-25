const router = require(`${rootPath}/plugins/router.js`);

router.get('/', (req, res) => {
  res.sendFile(`${rootPath}/pages/MainPage.html`);
});



module.exports = router;