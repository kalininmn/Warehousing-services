const router = require(`${rootPath}/plugins/router.js`);

router.get('/onlineBooking', (req, res) => {
  res.sendFile(`${rootPath}/pages/OnlineBookingPage.html`);
});

module.exports = router;