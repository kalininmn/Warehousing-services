const router = require(`${rootPath}/plugins/router.js`);

router.get('/services', (req, res) => {
  res.sendFile(`${rootPath}/pages/ServicesPage.html`);
});



module.exports = router;