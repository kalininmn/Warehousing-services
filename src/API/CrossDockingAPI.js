const router = require(`${rootPath}/plugins/router.js`);

router.get('/crossDocking', (req, res) => {
  res.sendFile(`${rootPath}/pages/CrossDockingPage.html`);
});



module.exports = router;