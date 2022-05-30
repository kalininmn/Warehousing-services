async function submitForm(event) {
  event.preventDefault();

  const data = {
    organizationName: +event.target.organizationName.value || '',
    contactPerson: +event.target.contactPerson.value || '',
    city: +event.target.city.value || '',
    mail: +event.target.mail.value || '',
    place: +event.target.place.value || '',
    time: +event.target.time.value || '',
    workingMode: +event.target.workingMode.value || '',
    productType: +event.target.productType.value || '',
    numbersOfTitles: +event.target.numbersOfTitles.value || '',
    storageCapacity: +event.target.storageCapacity.value || '',
    numbersOfCars: +event.target.numbersOfCars.value || '',
    averageQuantity: +event.target.averageQuantity.value || '',
    maxBoxWeight: +event.target.maxBoxWeight.value || '',
    numbersOfBox: +event.target.numbersOfBox.value || '',
    typeBox: +event.target.typeBox.value || '',
    orderStructure: +event.target.orderStructure.value || '',
    additionalServices: +event.target.additionalServices.value || '',
  };

  await fetch(
    '/v2/onlineBooking',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data),
    },
  );

  document.location.reload();
}