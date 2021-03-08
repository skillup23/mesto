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

//создаем карточку использую класс и возвращаем ее
function createCard(object, cardSelector, handleCardClick){
  const card = new Card(object, cardSelector, handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

const elementFoto = new PopupWithImage('.popup_type_image');

// Функция открытия фото
function handleCardClick(name, link) {
  // const elementFoto = new PopupWithImage('.popup_type_image');//извините, не очень понял что тут не так((
  elementFoto.open(name, link);
  elementFoto.setEventListeners();
}



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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Слушатели событий...................................................

// //Открытие попапа Ученый на кнопку редактировать
popupOpenProfile.addEventListener('click', function() {
  const userGetInfo = userInformation.getUserInfo();
  popupName.value = userGetInfo.name;
  popupProfession.value = userGetInfo.info;
  editProfile.open();
  editProfile.setEventListeners();
  validFormProfile.clearValidation();
});

//Открытие попапа Добавить карточку
popupOpenAddCard.addEventListener('click', function() {
  // formElementAddcard.reset();
  addCardNew.open();
  addCardNew.setEventListeners();
  validFormAddCard.clearValidation();
});

//валидация при изменении профиля
const validFormProfile = new FormValidator(config, formElement);
validFormProfile.enableValidation();

//валидация при создании карточек
const validFormAddCard = new FormValidator(config, formElementAddcard);
validFormAddCard.enableValidation();







//резервный код))....................................................................


// //Функция открытия попапа
// function openPopup(elem) {
//   elem.classList.add('popup_active');
//   document.addEventListener('keydown', closeOverlayEsc);
// }

// //Функция закрытия попапа
// function closePopup(elem) {
//   elem.classList.remove('popup_active');
//   document.removeEventListener('keydown', closeOverlayEsc);
// }

// //Функция закрытия попапа кликом по оверлею или кликом по крестику
// popups.forEach((popup) => {
//   popup.addEventListener('click', (evt) => {
//       if (evt.target.classList.contains('popup_active')) {
//           closePopup(popup);
//       }
//       if (evt.target.classList.contains('popup__close')) {
//         closePopup(popup)
//       }
//   });
// }) 

// //Функция закрытия попапа на Escape
// function closeOverlayEsc(evt) {
//   if (evt.key === 'Escape') {
//     const popupActive = document.querySelector('.popup_active');
//     closePopup(popupActive);
//   }
// }

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

// const addCardList = new Section({

// })

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

//Функция внесения изменений при нажатии на сохранить и закрытие попапа Ученый
// function handleFormSubmit (evt) {
//   evt.preventDefault(); 
//   userInformation.setUserInfo();
//   // profileName.textContent = popupName.value;
//   // profileProfession.textContent = popupProfession.value;
//   // closePopup(profilePopup);
// }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// // //Открытие попапа Карточка на кнопку 'добавить карточку'
// popupOpenAddCard.addEventListener('click', function() {
//   formElementAddcard.reset();
//   openPopup(popupAddcard);
//   validFormAddCard.clearValidation();
// });


//Сохранение изменений и закрытие попапа Ученый при нажатии на сохранить
// formElement.addEventListener('submit', () => {
//   profileName.textContent = popupName.value;
//   profileProfession.textContent = popupProfession.value;
// });

//Сохранение изменений и закрытие попапа добавить карточку при нажатии на сохранить
// formElementAddcard.addEventListener('submit', () => {
//   const object = {
//         name: popupAddcardName.value,
//         link: popupAddcardLink.value
//       };
    
//       defaultCardList.renderItems(object);
// });