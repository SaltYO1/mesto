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

const popupProfileOpenButton = document.querySelector('.profile__edit-btn'); // кнопка редактирования профиля 
const popupProfileBackground = document.querySelector('.popup_type_edit'); //фон попапа
const popupFormElement = popupProfileBackground.querySelector('.popup__form'); //форма
const nameInput = document.querySelector('.popup__input_text_name'); // поле ввода имени
const jobInput = document.querySelector('.popup__input_text_job'); // поле ввода "О себе"

const profileName = document.querySelector('.profile__name'); // имя в профиле
const profileSubtitle = document.querySelector('.profile__subtitle'); // описание профиля

const popupCardOpenBotton = document.querySelector('.profile__add-btn'); // кнопка добавления новой карточки
const popupCardBackground = document.querySelector('.popup_type_add-card'); //фон попапа добавления карточек
const cardFormElement = popupCardBackground.querySelector('.popup__form'); //форма добавления карточек
const popupCardSave = popupCardBackground.querySelector('.popup__submit-btn'); // кнопка сохранения в попапе с добавлением карточек

const template = document.querySelector('.card-template').content.querySelector('.elements__card'); // шаблон карточки
const cardsList = document.querySelector('.elements'); // список карточек
const cardNameInput = document.querySelector('.popup__input_card_name'); // поле ввода названия картинки
const cardLinkInput = document.querySelector('.popup__input_card_link'); // поле ввода ссылки на картинку
const imagePopupBackground = document.querySelector('.popup_type_openImg'); // фон попапа с открытием картинки
const imagePopupTitle = imagePopupBackground.querySelector('.popup__img-title'); // текст под картинкой
const imagePopupImg = imagePopupBackground.querySelector('.popup__image'); // открытая картинка
const popupCloseButtons = document.querySelectorAll('.popup__close'); //кнопки закрытия попапа

//функция закрытия попапа на escape
function closePopupEsc (evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//открытие попапа
function openPopup(popup) {
  // добавляем класс к фону попапа
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

clickOverlay(popupProfileBackground);
clickOverlay(popupCardBackground);
clickOverlay(imagePopupBackground);

//универсальная функция закрытия попапа кликом на крестик
popupCloseButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

// сохранение сабмита
function handleFormSubmit(evt) {
  evt.preventDefault();

  // получаем значения value и передаем в профиль
  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup(popupProfileBackground);
}

// активация кнопок
popupProfileOpenButton.addEventListener('click', () => {
  openPopup(popupProfileBackground)
  // выводим значения профиля в строки ввода формы
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;
});

popupFormElement.addEventListener('submit', handleFormSubmit);
popupCardOpenBotton.addEventListener('click', () => openPopup(popupCardBackground));
cardFormElement.addEventListener('submit', handleCardsSubmit);

//функция закрытия попапа кликом на оверлей
function clickOverlay (popup) {
  popup.addEventListener('mousedown', function(evt) {
    if (evt.target === popup) {
      closePopup(popup)
    }
  });
};


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

  closePopup(popupCardBackground);
  evt.target.reset();
  popupCardSave.classList.add('popup__submit-btn_inactive');
  popupCardSave.setAttribute('disabled', true);
}

// создание карточек
function createCard (item) {
  const card = template.cloneNode(true);
  const cardTtl = card.querySelector('.elements__title');
  cardTtl.textContent = item.name;
  const cardImg = card.querySelector('.elements__image');
  cardImg.src = item.link;
  cardImg.alt = item.name;

  const likeBtn = card.querySelector('.elements__like-btn'); // кнопка лайка
  // поставить/убрать лайк
  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('elements__like-btn_active');
  });

  // удалить карточку
  card.querySelector('.elements__trash').addEventListener('click', deleteCard);

  // открыть картинку на весь экран
  cardImg.addEventListener('click', (evt) => {
    openPopup(imagePopupBackground);
    imagePopupTitle.textContent = cardTtl.textContent;
    imagePopupImg.src = cardImg.src;
    imagePopupImg.alt = cardTtl.textContent;
  });

  return card;
}

// функция удаления карточки
function deleteCard (evt) {
  evt.target.closest('.elements__card').remove();
}








