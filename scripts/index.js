let background = document.querySelector('.popup'); //фон попапа
let formElement = document.querySelector('.popup__container'); //окно формы

let nameInput = document.querySelector('.popup__input_text_name'); // поле ввода имени
let jobInput = document.querySelector('.popup__input_text_job'); // поле ввода "О себе"
let profileName = document.querySelector('.profile__name'); // имя в профиле
let profileSubtitle = document.querySelector('.profile__subtitle'); // описание профиля

let popupOpen = document.querySelector('.profile__edit-btn'); // кнопка редактирования профиля
let popupClose = document.querySelector('.popup__close'); // кнопка закрытия окна формы
let popupSave = document.querySelector('.popup__submit-btn'); // кнопка "Сохранить"

//открытие попапа
function open() {
  // добавляем класс к фону попапа
  background.classList.add('popup_opened');

  // выводим значения профиля в строки ввода формы
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;
}

//закрытие попапа
function close() {
  background.classList.remove('popup_opened');
}

//сохранение сабмита
function handleFormSubmit(evt) {
  evt.preventDefault();

  //получаем значения value и передаем в профиль
  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  close() 
}

//активация кнопок
formElement.addEventListener('submit', handleFormSubmit);
popupOpen.addEventListener('click', open);
popupClose.addEventListener('click', close);






