async function generateContent() {
  const main = document.getElementsByClassName('wrapper-main')[0];
  let authenticated = false;

  authenticated = await checkAuthenticated();

  if (authenticated) {
    createAddButton(main);
  }
}

function createAddButton(main) {
  const wrapperAddButton = document.createElement('div');
  wrapperAddButton.className = 'wrapper-add-button';

  const addButton = document.createElement('button');
  addButton.className = 'add-button';
  addButton.innerHTML = 'Обновить';
  addButton.addEventListener('click', () => openTariffForm(null));

  wrapperAddButton.append(addButton);
  main.prepend(wrapperAddButton);

  const wrapperTariff = document.getElementsByClassName('wrapper-tariff')[0];
  wrapperTariff.style.height = '90%';
}

function openTariffForm() {
  const wrapperTariff = document.getElementsByClassName('wrapper-tariff')[0];
  wrapperTariff.innerHTML = `<form onsubmit="submitForm(event)" class="tariff-form">
  <label for="tariff">Файл</label>
  <input id="tariff" name="tariff" type="file" accept="application/pdf"></input>
  <button type="submit">Обновить</button>
  </form>`;
}

async function submitForm(event) {
  event.preventDefault();
  const data = new FormData(event.target);

  await fetch(
    'v2/tariff',
    {
      method: 'PUT',
      body: data,
    },
    );
  
  document.location.reload();
}

// проверка, авторизован ли пользователь
async function checkAuthenticated() {
  const authenticated = await Authentication.checkAuthenticated();
  return authenticated;
}

generateContent();