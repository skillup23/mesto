import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import PopupWithDelete from './components/PopupWithDelete.js'
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
  profileAvatar,
  popupAvatar,
  formElementAvatar,
} from './utils/constants.js';

import Api from './components/Api.js';
const api = new Api();

//===================================================================================================
//Реализация карточкек из сервера

//создаем карточку используя класс и возвращаем ее
function createCard(data, userData, cardSelector){
  const card = new Card({
    data: data,
    userData: userData,
    handleCardClick: handleCardClick,
    handleDeleteIconClick: handleDeleteIconClick,
    handleLikeClick: (cardId) => {
      if (card.isLiked()) {
        api.removelikeCard(cardId)
          .then((data) => {
            card.infoLikes(data)
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        api.likeCard(cardId)
          .then((data) => {
            card.infoLikes(data)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
  }, cardSelector);
  const cardElement = card.generateCard();

  return cardElement;
}

// Создаем карточки из массива и помещаем их на страницу
const defaultCardList = new Section({
  data: {},
  renderer: (object, userData) => {
    const card = createCard(object, userData, '.element_template_type_default');

    defaultCardList.setItem(card);
  },
}, '.elements');

//функция Сохранение...
function renderLoading(data, isLoading) {
  const popupTextSave = document.querySelector(data).querySelector('.popup__submit_save');
  if (isLoading) {
    popupTextSave.textContent = 'Сохранение...';
  }
  else {
    popupTextSave.textContent = 'Сохранить';
  }
}

//===================================================================================================
//Реализация добавления своей карточи на страницу

//Создаем класс для попап Добавить карточку и выкладываем готовую карточку на страницу
const addCardNew = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  handleFormSubmit: (value) => {
    renderLoading('.popup_type_new-card', true);
    api.addNewCard({ name: value.namemesto_input, link: value.link_input})
      .then(data => {
        const card = createCard(data, userInformation.getUserInfo(), '.element_template_type_default');

        defaultCardList.setItemStart(card);
        addCardNew.close();
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        renderLoading('.popup_type_new-card', false);
      });
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


//создаем экземпляр попапа Фото
const elementFoto = new PopupWithImage('.popup_type_image');
//Навешиваем обработчики для попап Добавить карточку
elementFoto.setEventListeners();

// Функция открытия фото
function handleCardClick(name, link) {
  elementFoto.open(name, link);
}

// Функция открытия удаления фото
function handleDeleteIconClick (element, cardId) {
  popapDelCard.open({ element, cardId })
}




//Создаем класс для попап Удаления карточки
const popapDelCard = new PopupWithDelete({
  popupSelector: '.popup_type_delete-card',
  handleFormSubmit: ( {element, cardId} ) => {
    api.delCard(cardId)
      .then(() => {
        element.remove();
        popapDelCard.close()
      })
      .catch((error) => {
        console.log(error)
      })
  }
});
//вешаем слушатели на попап Удаления карточки
popapDelCard.setEventListeners();


//информация полученная с серввера
const apiInfoCardsPerson = [api.getInitialCards(), api.getPersonInfo()]

Promise.all(apiInfoCardsPerson)//думал вот не зря же Дмитрий Ханин написал про Promise.all
  .then(([resultCard, resultUser]) => {// и так таки верно
    userInformation.setUserInfo(resultUser._id, resultUser.name, resultUser.about, resultUser.avatar)
    defaultCardList.setRenderedItems(resultCard);
    defaultCardList.renderItems(resultUser);//долго я думал как запихнуть данные с Сервера от моего пользователя совместно с данными карточек
  })
  .catch((error) => {
    console.log(error)
  })


//===================================================================================================
//Реализация редактирования информации об Ученом(пользователе)


//Класс с информацией о пользователе
const userInformation = new UserInfo({
  name: document.querySelector('.profile__name'),
  info: document.querySelector('.profile__profession'),
  avatar: document.querySelector('.profile__avatar')
});

//Создаем класс для попап Ученый
const editProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (value) => {
    renderLoading('.popup_type_edit', true);
    api.sendUserInformation({ name: value.name_input, about: value.job_input })
      .then(result => {
        userInformation.setUserInfo(result._id, result.name, result.about, result.avatar);
        editProfile.close();
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        renderLoading('.popup_type_edit', false);
      });
  }
});

//Создаем класс для попап Аватар
const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar',
  handleFormSubmit: (value) => {
    renderLoading('.popup_type_edit-avatar', true)
    api.editAvatar( {avatar: value.avatar_input} )
      .then(result => {
        userInformation.setUserInfo(result._id, result.name, result.about, result.avatar);
        popupEditAvatar.close();
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        renderLoading('.popup_type_edit-avatar', false);
      });
  }
})


//навешиваем обработчики для попап Ученый
editProfile.setEventListeners();
popupEditAvatar.setEventListeners();


//Открытие попапа Ученый на кнопку редактировать
popupOpenProfile.addEventListener('click', function() {
  const userGetInfo = userInformation.getUserInfo();
  popupName.value = userGetInfo.name;
  popupProfession.value = userGetInfo.info;
  editProfile.open();
  // editProfile.setEventListeners();
  validFormProfile.clearValidation();
});

//перенести в константы================================================================================
// const profileAvatar = document.querySelector('.profile__avatar');
// const popupAvatar = document.querySelector('.form__item_linkavatar');
// const formElementAvatar = document.forms.editavatar;

//Открытие попапа Аватар на кнопку Иконку
profileAvatar.addEventListener('click', function() {
  const userGetInfo = userInformation.getUserInfo();
  popupAvatar.value = userGetInfo.avatar;
  popupEditAvatar.open();
  validAvatarProfile.clearValidation();
});



//валидация при изменении профиля
const validFormProfile = new FormValidator(config, formElement);
validFormProfile.enableValidation();

//валидация при создании карточек
const validFormAddCard = new FormValidator(config, formElementAddcard);
validFormAddCard.enableValidation();

//валидация при изменении аватара
const validAvatarProfile = new FormValidator(config, formElementAvatar);
validAvatarProfile.enableValidation();




// api.getInitialCards()
//   .then((result) => {
//     defaultCardList.setRenderedItems(result);
//     defaultCardList.renderItems(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// api.getPersonInfo()
//   .then((result) => {
//     userInformation.setUserInfo(result._id, result.name, result.about, result.avatar);
//     console.log(result._id)
//   })
//   .catch((err) => {
//     console.log(err);
//   });