const router = require(`${rootPath}/plugins/router.js`);

router.get('/documents', (req, res) => {
  res.sendFile(`${rootPath}/pages/DocumentsPage.html`);
});



module.exports = router;