async function generateContent() {
  const main = document.getElementsByClassName('wrapper-main')[0];
  let cards = [];
  let authenticated = false;

  main.innerHTML = 'Загрузка...';
  cards = await getCards();
  authenticated = await checkAuthenticated();
  main.innerHTML = '';

  if (authenticated) {
    createAddButton(main);
  }

  createNews(main);
  renderCards(cards, authenticated, main);
}

// Добавляет кнопку для добавление новой новости.
function createAddButton(main) {
  const wrapperAddButton = document.createElement('div');
  wrapperAddButton.className = 'wrapper-add-button';

  const addButton = document.createElement('button');
  addButton.className = 'add-button';
  addButton.innerHTML = 'Добавить';
  addButton.addEventListener('click', () => createCard(null));

  wrapperAddButton.append(addButton);
  main.append(wrapperAddButton);
}

// Создаёт корневой блок, в который будут рендерится новости.
function createNews(main) {
  const wrapperNews = document.createElement('div');
  wrapperNews.className = 'wrapper-news';
  main.append(wrapperNews);

  // const wrapperAddButton = document.getElementsByClassName('wrapper-add-button')[0];
  // if (!!wrapperAddButton) {
  //   wrapperNews.style.height = '90%';
  // }
}

// Рендерит список новостей
function renderCards(cards, authenticated, main) {
  const wrapperNews = document.getElementsByClassName('wrapper-news')[0];

  if (cards.length !== 0) {
    cards.forEach((card) => {
      const wrapperCard = document.createElement('div');
      wrapperCard.className = 'wrapper-card';
      wrapperCard.innerHTML = `${ authenticated ? '<span class="edit-card"><img src="/assets/icons/pencil-outline.png" /></span>' : ''}
      <div class="card">
        <h3>${card.title}</h3>
        <hr>
        <span>${card.description}</span>
      </div>`
    
      wrapperCard.querySelector('.edit-card')?.addEventListener('click', () => editItem(card, wrapperCard));
    
      wrapperNews.append(wrapperCard);
    });
  } else {
    wrapperNews.innerHTML = 'Данных нет';
  }

  main.append(wrapperNews);
}

// Делает из новости форму для добавления/редактирования
function editItem(card, wrapperCard) {
  closeEditing();
  wrapperCard.querySelector('.card')
  .innerHTML = `<form onsubmit="submitForm(event)" class="news-form">
  <input type="hidden" name="id" value="${card?.id || null}"></input>
  <div class="form__item">
  <label for="news-title">Заголовок</label>
  <input id="news-title" name="title" value="${card?.title || ''}"></input>
  </div>
  <div class="form__item">
  <label for="news-description">Описание</label>
  <input id="news-description" name="description" value="${card?.description || ''}"></input>
  </div>
  <button type="submit">${card?.id ? 'Обновить' : 'Создать'}</button>
</form>`
}

// Создаёт новую карту
function createCard() {
  const wrapperNews = document.getElementsByClassName('wrapper-news')[0];
  const wrapperCard = document.createElement('div');
  wrapperCard.className = 'wrapper-card';
  wrapperCard.innerHTML = '<div class="card"></div>';
  editItem(undefined, wrapperCard);
  wrapperNews.append(wrapperCard);
}

/* Вспомогательные функции */
// Удаление возможности редактирования
function closeEditing() {
  document.getElementsByClassName('add-button')[0].remove();
  const allEditButtons = document.getElementsByClassName('edit-card');
  for (let i = 0; i < allEditButtons.length; i++) {
    allEditButtons[i].innerHTML = '';
  }
}

async function submitForm(event) {
  event.preventDefault();

  const data = {
    id: +event.target.id.value || null,
    title: event.target.title.value,
    description: event.target.description.value,
  };
  
  let method = 'GET';
  if (data.id) {
    method = 'PUT';
  } else {
    method = 'POST';
  }

  await fetch(
    '/v2/news',
    {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data),
    },
  );

  document.location.reload();
}

// получение карт
async function getCards() {
  const cards = await fetch('/v2/news', { method: 'GET' }).then((data) => data.json());
  return cards;
}

// проверка, авторизован ли пользователь
async function checkAuthenticated() {
  const authenticated = await Authentication.checkAuthenticated();
  return authenticated;
}
/* --- */

generateContent();