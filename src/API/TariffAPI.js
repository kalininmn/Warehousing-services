const router = require(`${rootPath}/plugins/router.js`);

router.get('/tariff', (req, res) => {
  res.sendFile(`${rootPath}/pages/tariffPage.html`);
});



module.exports = router;