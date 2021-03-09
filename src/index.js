import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import './pages/index.css'

import {
  popupOpenProfile,
  popupName,
  popupProfession,
  formElement,
  popupOpenAddCard,
  formElementAddcard,
  initialCardsNew,
  config,
} from './utils/constants.js';


//===================================================================================================
//Реализация карточкек из массива

// Создаем карточки из массива и помещаем их на страницу
const defaultCardList = new Section({
  data: initialCardsNew,
  renderer: (object) => {
    const card = createCard(object, '.element_template_type_default', handleCardClick);

    defaultCardList.setItem(card);
  },
}, '.elements');

//вызываем метод Section чтобы для каждого элемента массива передать функцию renderer
defaultCardList.renderItems();


//===================================================================================================
//Реализация добавления карточек на страницу

//Создаем класс для попап Добавить карточку и выкладываем готовую карточку на страницу
const addCardNew = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  handleFormSubmit: (data) => {
    const object = {
          name: data.namemesto_input,
          link: data.link_input
        };
    const card = createCard(object, '.element_template_type_default', handleCardClick);

    defaultCardList.setItemStart(card);
    }
})

//Навешиваем обработчики для попап Добавить карточку
addCardNew.setEventListeners();

//Открытие попапа Добавить карточку
popupOpenAddCard.addEventListener('click', function() {
  // formElementAddcard.reset();
  addCardNew.open();
  // addCardNew.setEventListeners();
  validFormAddCard.clearValidation();
});

//создаем карточку использую класс и возвращаем ее
function createCard(object, cardSelector, handleCardClick){
  const card = new Card(object, cardSelector, handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

//создаем экземпляр попапа Фото
const elementFoto = new PopupWithImage('.popup_type_image');
//Навешиваем обработчики для попап Добавить карточку
elementFoto.setEventListeners();

// Функция открытия фото
function handleCardClick(name, link) {
  // const elementFoto = new PopupWithImage('.popup_type_image');
  elementFoto.open(name, link);
  // elementFoto.setEventListeners();
}


//===================================================================================================
//Реализация редактирования информации об Ученом(пользователе)

//Класс с информацией о пользователе
const userInformation = new UserInfo({
  name: document.querySelector('.profile__name'),
  info: document.querySelector('.profile__profession')
});

//Создаем класс для попап Ученый
const editProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  // handleFormSubmit: () => {
  //   userInformation.setUserInfo(popupName.value, popupProfession.value);
  // }
  handleFormSubmit: (data) => {
    userInformation.setUserInfo(data.name_input, data.job_input);
  }
})

//навешиваем обработчики для попап Ученый
editProfile.setEventListeners();



// //Открытие попапа Ученый на кнопку редактировать
popupOpenProfile.addEventListener('click', function() {
  const userGetInfo = userInformation.getUserInfo();
  popupName.value = userGetInfo.name;
  popupProfession.value = userGetInfo.info;
  editProfile.open();
  // editProfile.setEventListeners();
  validFormProfile.clearValidation();
});


//валидация при изменении профиля
const validFormProfile = new FormValidator(config, formElement);
validFormProfile.enableValidation();

//валидация при создании карточек
const validFormAddCard = new FormValidator(config, formElementAddcard);
validFormAddCard.enableValidation();