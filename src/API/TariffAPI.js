const router = require(`${rootPath}/plugins/router.js`);
const parserFormData = require(`${rootPath}/utils/parserFormData.js`);

router.get('/tariff', (req, res) => {
  res.sendFile(`${rootPath}/pages/TariffPage.html`);
});

router.get('/v2/tariff', (req, res) => {
  res.sendFile(`${rootPath}/assets/tariff/tariff.pdf`);
});

router.put('/v2/tariff', (req, res) => {
  parserFormData(req, 'src/assets/tariff');
  res.sendFile(`${rootPath}/pages/tariffPage.html`);
});



module.exports = router;