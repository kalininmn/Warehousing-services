const router = require(`${rootPath}/plugins/router.js`);

router.get('/loginPage', (req, res) => {
  res.sendFile(`${rootPath}/pages/LoginPage.html`);
});



module.exports = router;