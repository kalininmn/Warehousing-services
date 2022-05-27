const router = require(`${rootPath}/plugins/router.js`);

router.get('/authentication', (req, res) => {
  const authenticated = true;
  res.send(authenticated);
});

module.exports = router;