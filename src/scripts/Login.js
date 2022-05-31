async function submitForm(event) {
  event.preventDefault();

  const data = {
    login: event.target.login.value || '',
    password: +event.target.password.value || null,
  };

  await fetch(
    '/authentication',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data),
    },
  );

  window.location.href = '/';
}