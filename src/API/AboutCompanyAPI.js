const router = require(`${rootPath}/plugins/router.js`);

router.get('/aboutCompany', (req, res) => {
  res.sendFile(`${rootPath}/pages/AboutCompanyPage.html`);
});



module.exports = router;