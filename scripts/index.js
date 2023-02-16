const editPopupOpen = document.querySelector('.profile__edit-btn'); // кнопка редактирования профиля
const editPopupBackground = document.querySelector('.popup_type_edit'); //фон попапа 
const editFormElement = editPopupBackground.querySelector('.popup__form'); //форма
const nameInput = document.querySelector('.popup__input_text_name'); // поле ввода имени
const jobInput = document.querySelector('.popup__input_text_job'); // поле ввода "О себе"
const editPopupClose = editPopupBackground.querySelector('.popup__close'); // кнопка закрытия окна формы редактирования профиля

const profileName = document.querySelector('.profile__name'); // имя в профиле
const profileSubtitle = document.querySelector('.profile__subtitle'); // описание профиля

const addCardPopupOpen = document.querySelector('.profile__add-btn'); // кнопка добавления новой карточки
const addCardPopupBackground = document.querySelector('.popup_type_add-card'); //фон попапа добавления карточек
const cardFormElement = addCardPopupBackground.querySelector('.popup__form'); //форма добавления карточек
const addCardPopupClose = addCardPopupBackground.querySelector('.popup__close'); // кнопка закрытия окна формы добавления новой карточки

const template = document.querySelector('.card-template').content.querySelector('.elements__card'); // шаблон карточки
const cardsList = document.querySelector('.elements'); // список карточек
const cardNameInput = document.querySelector('.popup__input_card_name'); // поле ввода названия картинки
const cardLinkInput = document.querySelector('.popup__input_card_link'); // поле ввода ссылки на картинку
const imagePopupBackground = document.querySelector('.popup_type_openImg'); // фон попапа с открытием картинки
const imagePopupClose = imagePopupBackground.querySelector('.popup__close'); // кнопка закрытия
const imagePopupTitle = imagePopupBackground.querySelector('.popup__img-title'); // текст под картинкой
const imagePopupImg = imagePopupBackground.querySelector('.popup__image'); // открытая картинка

//открытие попапа
function open(popup) {
  // добавляем класс к фону попапа
  popup.classList.add('popup_opened');
}

// закрытие попапа
function close(popup) {
  popup.classList.remove('popup_opened');
}

// выводим значения профиля в строки ввода формы
nameInput.value = profileName.textContent;
jobInput.value = profileSubtitle.textContent;

// сохранение сабмита
function handleFormSubmit(evt) {
  evt.preventDefault();

  // получаем значения value и передаем в профиль
  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  close(editPopupBackground);
}

// активация кнопок
editPopupOpen.addEventListener('click', () => open(editPopupBackground));
editFormElement.addEventListener('submit', handleFormSubmit);
editPopupClose.addEventListener('click', () => close(editPopupBackground));

addCardPopupOpen.addEventListener('click', () => open(addCardPopupBackground));
cardFormElement.addEventListener('submit', handleCardsSubmit);
addCardPopupClose.addEventListener('click', () => close(addCardPopupBackground));

imagePopupClose.addEventListener('click', () => close(imagePopupBackground));

// массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// загрузка массива карточек
function loadCards(items) {
  const cards = items.map((item) => {
    return createCard(item);
  });

  cardsList.append(...cards);
}

loadCards(initialCards);


// сохранение сабмита карточек
function handleCardsSubmit(evt) {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  const card = createCard({name: name, link: link});
  cardsList.prepend(card);

  close(addCardPopupBackground);
}

// создание карточек
function createCard (item) {
  const card = template.cloneNode(true);
  const cardTtl = card.querySelector('.elements__title');
  cardTtl.textContent = item.name;
  const cardImg = card.querySelector('.elements__image');
  cardImg.src = item.link;

  const likeBtn = card.querySelector('.elements__like-btn'); // кнопка лайка
  // поставить/убрать лайк
  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('elements__like-btn_active');
  });

  // удалить карточку
  card.querySelector('.elements__trash').addEventListener('click', deleteCard);

  // открыть картинку на весь экран
  cardImg.addEventListener('click', (evt) => {
    open(imagePopupBackground);
    imagePopupTitle.textContent = cardTtl.textContent;
    imagePopupImg.src = cardImg.src;
  });

  return card;
}

// функция удаления карточки
function deleteCard (evt) {
  evt.target.closest('.elements__card').remove();
}








