import FormValidator from './validate.js'
import Card from './Card.js'


//Переменные редактирования раздела Ученый
const popupopen = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const popupclose = profilePopup.querySelector('.popup__close_edit');
const popupName = profilePopup.querySelector('.form__item_profile_name');
const popupProfession = profilePopup.querySelector('.form__item_profile_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const formElement = profilePopup.querySelector('.form_type_edit');
// const buttonSaveProfile = profilePopup.querySelector('.popup__submit');//костыль
//Переменные карточек массива
// const elementTemplate = document.querySelector('.element_template').content;
const elements = document.querySelector('.elements');
//Переменные кнопки 'добавить карточку'
const popupopenAddcard = document.querySelector('.profile__add-button');
const popupAddcard = document.querySelector('.popup_type_new-card');
const popupcloseAddcard = popupAddcard.querySelector('.popup__close_addcard');
const popupAddcardName = popupAddcard.querySelector('.form__item_namemesto');
const popupAddcardLink = popupAddcard.querySelector('.form__item_linkfoto');
const formElementAddcard = document.forms.addcard;
// const buttonSaveAdd = formElementAddcard.querySelector('.popup__submit');//костыль
//Переменные открытия фото
// const popupPhoto = document.querySelector('.popup_type_image');
// const popupclosePhoto = popupPhoto.querySelector('.popup__close_mesto');
// const photo = popupPhoto.querySelector('.popup__photo');
// const textPhoto = popupPhoto.querySelector('.popup__textphoto');

// конфиг для валидации
const config = {
  formSelector: '.form',
  inputSelector: '.form__item',
  // setSelector: '.form__set',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
}


//Функции....................................................................


//Функция открытия попапа
function openPopup(elem) {
  elem.classList.add('popup_active');
  // elemen.classList.add('popup__submit_inactive');//костыль
  elem.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', closeOverlayEsc);
}

//Функция закрытия попапа
function closePopup(elem) {
  elem.classList.remove('popup_active');
  elem.removeEventListener('click', closeOverlay);
  document.removeEventListener('keydown', closeOverlayEsc);
}

//Функция закрытия попапа кликом по оверлею
function closeOverlay(event) {
  if (event.target === event.currentTarget){
    const popupActive = document.querySelector('.popup_active');
    closePopup(popupActive);
  }
}

//Функция закрытия попапа на Escape
function closeOverlayEsc(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_active');
    closePopup(popupActive);
  }
}

//Функция внесения изменений при нажатии на сохранить и закрытие попапа Ученый
function handleFormSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = popupName.value;
  profileProfession.textContent = popupProfession.value;
  closePopup(profilePopup);
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Код про создание карточек

// массив с карточками
const initialCardsNew = [
  {
    name: 'Мон-Сен-Мишель',
    link: 'https://images.unsplash.com/photo-1562614174-c82de799351a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Лапландия',
    link: 'https://images.unsplash.com/photo-1607020259898-bc4a1182ae75?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=647&q=80'
  },
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



// Создаем карточки из массива объектов
initialCardsNew.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, '.element_template_type_default');
  // Создаём карточку и возвращаем наружу
  const cardElementNew = card.generateCard();

  // Добавляем в DOM
  elements.append(cardElementNew);
}); 


// Создаем карточку через форму
function handleFormSubmitAddcard (evt) {
  evt.preventDefault();
  const object = {     // Привожу к объекту значения из формы
    name: popupAddcardName.value,
    link: popupAddcardLink.value
  };
    // Создадим экземпляр карточки
  const card = new Card(object, '.element_template_type_default');
    // Создаём карточку и возвращаем наружу
  const cardElementNew = card.generateCard();
  
    // Добавляем в DOM
  elements.prepend(cardElementNew);
  closePopup(popupAddcard);
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Слушатели событий...................................................

//Открытие попапа Ученый на кнопку редактировать
popupopen.addEventListener('click', function() {
  popupName.value = profileName.textContent;
  popupProfession.value = profileProfession.textContent;
  openPopup(profilePopup);//костыль
  validFormAddCard.clearValidation();
  validFormAddCard.buttonStateInactive();
});

//Открытие попапа Карточка на кнопку 'добавить карточку'
popupopenAddcard.addEventListener('click', function() {
  formElementAddcard.reset();
  openPopup(popupAddcard);//костыль
  validFormAddCard.clearValidation();
  validFormAddCard.buttonStateInactive();
});

//Закрытие попапа Ученый на крестик
popupclose.addEventListener('click', function() {
  closePopup(profilePopup);
});

//Закрытие попапа 'добавить карточку' на крестик
popupcloseAddcard.addEventListener('click', function() {
  closePopup(popupAddcard);
});

// //Закрытие попапа Фото на крестик
// popupclosePhoto.addEventListener('click', function() {
//   closePopup(popupPhoto);
// });


//Сохранение изменений и закрытие попапа Ученый при нажатии на сохранить
formElement.addEventListener('submit', handleFormSubmit);

//Сохранение изменений и закрытие попапа при нажатии на сохранить
formElementAddcard.addEventListener('submit', handleFormSubmitAddcard);

//валидация про изменение профиля
const validFormProfile = new FormValidator(config, formElement);
validFormProfile.enableValidation();

//валидация по созданию карточек
const validFormAddCard = new FormValidator(config, formElementAddcard);
validFormAddCard.enableValidation();