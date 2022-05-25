const router = require(`${rootPath}/plugins/router.js`);

router.get('/benefits', (req, res) => {
  res.sendFile(`${rootPath}/pages/BenefitsPage.html`);
});



module.exports = router;