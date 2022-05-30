async function submitForm(event) {
  event.preventDefault();

  const data = {
    phone: +event.target.phone.value || null,
  };

  await fetch(
    '/v2/orderCall',
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