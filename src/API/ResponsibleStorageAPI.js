const router = require(`${rootPath}/plugins/router.js`);

router.get('/responsibleStorage', (req, res) => {
  res.sendFile(`${rootPath}/pages/ResponsibleStoragePage.html`);
});



module.exports = router;