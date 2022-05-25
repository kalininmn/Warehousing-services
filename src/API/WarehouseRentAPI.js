const router = require(`${rootPath}/plugins/router.js`);

router.get('/warehouseRent', (req, res) => {
  res.sendFile(`${rootPath}/pages/WarehouseRentPage.html`);
});



module.exports = router;