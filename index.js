import FormValidator from './scripts/FormValidator.js'
// import Card from './scripts/Card.js'
// import './pages/index.css'
import Section from './scripts/Section.js';

const popups = document.querySelectorAll('.popup')//находим все попапы
//Переменные редактирования раздела Ученый
const popupOpenProfile = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const popupName = profilePopup.querySelector('.form__item_profile_name');
const popupProfession = profilePopup.querySelector('.form__item_profile_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const formElement = profilePopup.querySelector('.form_type_edit');
//Переменные карточек массива
const elements = document.querySelector('.elements');
//Переменные кнопки 'добавить карточку'
const popupOpenAddCard = document.querySelector('.profile__add-button');
const popupAddcard = document.querySelector('.popup_type_new-card');
const popupAddcardName = popupAddcard.querySelector('.form__item_namemesto');
const popupAddcardLink = popupAddcard.querySelector('.form__item_linkfoto');
const formElementAddcard = document.forms.addcard;
//Переменные открытия фото
const popupPhoto = document.querySelector('.popup_type_image');
const imagePopupPicture = popupPhoto.querySelector('.popup__photo');
const imagePopupCaption = popupPhoto.querySelector('.popup__textphoto');

// конфиг для валидации
const config = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
}


//Функции....................................................................


//Функция открытия попапа
function openPopup(elem) {
  elem.classList.add('popup_active');
  document.addEventListener('keydown', closeOverlayEsc);
}

//Функция закрытия попапа
function closePopup(elem) {
  elem.classList.remove('popup_active');
  document.removeEventListener('keydown', closeOverlayEsc);
}

//Функция закрытия попапа кликом по оверлею или кликом по крестику
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_active')) {
          closePopup(popup);
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
  });
}) 

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

const defaultCardList = new Section({
  data: initialCardsNew
}, '.elements');

defaultCardList.renderItems();


// //Создаем карточку
// function createCard(object, temlate, handleCardClick) { // передаем данные карточки, шаблон разметки и функцию открытия попапа Фото
//   // Создадим экземпляр карточки
//   const card = new Card(object, temlate, handleCardClick);

//   return card.generateCard();// запускаем публичный метод в классе Card (Card.js) 
// }

// // Добавляем в DOM карточки из массива объектов
// initialCardsNew.forEach((item) => {
//   elements.append(createCard(item, '.element_template_type_default', handleCardClick));
// }); 


// // Добавляем в DOM карточку через форму
// function handleFormSubmitAddcard (evt) {
//   evt.preventDefault();
//   const object = {     // Привожу к объекту значения из формы
//     name: popupAddcardName.value,
//     link: popupAddcardLink.value
//   };

//   elements.prepend(createCard(object, '.element_template_type_default', handleCardClick));
//   closePopup(popupAddcard);
// }

// // данные карточки передаем сюда и открываем попап фото
// function handleCardClick(name, link) {
//   imagePopupPicture.src = link;
//   imagePopupPicture.alt = name;
//   imagePopupCaption.textContent = name;
//   openPopup(popupPhoto);
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Слушатели событий...................................................

//Открытие попапа Ученый на кнопку редактировать
popupOpenProfile.addEventListener('click', function() {
  popupName.value = profileName.textContent;
  popupProfession.value = profileProfession.textContent;
  openPopup(profilePopup);
  validFormProfile.clearValidation();
});

//Открытие попапа Карточка на кнопку 'добавить карточку'
popupOpenAddCard.addEventListener('click', function() {
  formElementAddcard.reset();
  openPopup(popupAddcard);
  validFormAddCard.clearValidation();
});


//Сохранение изменений и закрытие попапа Ученый при нажатии на сохранить
formElement.addEventListener('submit', handleFormSubmit);

//Сохранение изменений и закрытие попапа добавить карточку при нажатии на сохранить
// formElementAddcard.addEventListener('submit', handleFormSubmitAddcard);

//валидация при изменении профиля
const validFormProfile = new FormValidator(config, formElement);
validFormProfile.enableValidation();

//валидация при создании карточек
const validFormAddCard = new FormValidator(config, formElementAddcard);
validFormAddCard.enableValidation();