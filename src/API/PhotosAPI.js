const router = require(`${rootPath}/plugins/router.js`);

router.get('/photos', (req, res) => {
  res.sendFile(`${rootPath}/pages/PhotosPage.html`);
});



module.exports = router;