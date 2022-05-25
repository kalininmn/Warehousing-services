const router = require(`${rootPath}/plugins/router.js`);

router.get('/news', (req, res) => {
  res.sendFile(`${rootPath}/pages/NewsPage.html`);
});



module.exports = router;