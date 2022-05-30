const router = require(`${rootPath}/plugins/router.js`);
const db = require(`${rootPath}/utils/dbConnect`);

router.get('/onlineBooking', (req, res) => {
  res.sendFile(`${rootPath}/pages/OnlineBookingPage.html`);
});

router.post('/v2/onlineBooking', async (req, res) => {
  console.log(req.body);
  const {
    organizationName,
    contactPerson,
    city,
    mail,
    place,
    time,
    workingMode,
    productType,
    numbersOfTitles,
    storageCapacity,
    numbersOfCars,
    averageQuantity,
    maxBoxWeight,
    numbersOfBox,
    orderStructure,
    additionalServices,
  } = req.body;

  await new Promise((resolve, reject) => {
    db.execute(
      'INSERT INTO online_booking (organizationName, contactPerson, '
      + 'city, mail, place, time, workingMode, productType, numbersOfTitles, '
      + 'storageCapacity, numbersOfCars, averageQuantity, maxBoxWeight, '
      + 'numbersOfBox, orderStructure, additionalServices) VALUES (?, ?, ?, ?, ?, '
      + '?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      [
        organizationName,
        contactPerson,
        city,
        mail,
        place,
        time,
        workingMode,
        productType,
        numbersOfTitles,
        storageCapacity,
        numbersOfCars,
        averageQuantity,
        maxBoxWeight,
        numbersOfBox,
        orderStructure,
        additionalServices,
      ],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });

  res.sendStatus(200);
});

module.exports = router;