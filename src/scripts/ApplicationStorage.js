async function submitForm(event) {
  event.preventDefault();

  const data = {
    mail: event.target.mail.value,
    text: event.target.text.value,
  };

  await fetch(
    '/v2/applicationStorage',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data),
    },
  );
}