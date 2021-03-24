import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithDelete from '../components/PopupWithDelete.js'
import './index.css'

import {
  popupOpenProfile,
  popupName,
  popupProfession,
  formElement,
  popupOpenAddCard,
  formElementAddcard,
  config,
  profileAvatar,
  formElementAvatar,
  elementTemplate,
  renderLoading,
  elementSelector,
  selectorPopupNewCard,
  selectorPopupImage,
  selectorPopupDeleteCard,
  selectorPopupEdit,
  selectorPopupEditAvatar,
  profileName,
  profileProfession,
} from '../utils/constants.js';

import Api from '../components/Api.js';
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1',
  groupId: 'cohort-21',
  headers: {
    authorization: '05f91987-8317-4af4-b0c3-253fbec9cd8b',
    'Content-Type': 'application/json'
  }
});

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
  renderer: (data, userData) => {
    const card = createCard(data, userData, elementTemplate);

    defaultCardList.appendCard(card);
  },
}, elementSelector);


//===================================================================================================
//Реализация добавления своей карточи на страницу

//Создаем класс для попап Добавить карточку и выкладываем готовую карточку на страницу
const popupAddCard = new PopupWithForm(
  selectorPopupNewCard,
  (value) => {
    renderLoading(selectorPopupNewCard, true);
    api.addNewCard({ name: value.namemesto_input, link: value.link_input})
      .then(data => {
        const card = createCard(data, userInformation.getUserInfo(), elementTemplate);

        defaultCardList.prependCard(card);
        popupAddCard.close();
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        renderLoading(selectorPopupNewCard, false);
      });
})

//Навешиваем обработчики для попап Добавить карточку
popupAddCard.setEventListeners();

//Открытие попапа Добавить карточку
popupOpenAddCard.addEventListener('click', function() {
  // formElementAddcard.reset();
  popupAddCard.open();
  // popupAddCard.setEventListeners();
  validFormAddCard.clearValidation();
});


//создаем экземпляр попапа Фото
const popupPhoto = new PopupWithImage(selectorPopupImage);

//Навешиваем обработчики для попап Добавить карточку
popupPhoto.setEventListeners();

// Функция открытия фото
function handleCardClick(name, link) {
  popupPhoto.open(name, link);
}

// Функция открытия удаления фото
function handleDeleteIconClick (element, cardId) {
  popupDeleteCard.open({ element, cardId })
}




//Создаем класс для попап Удаления карточки
const popupDeleteCard = new PopupWithDelete({
  popupSelector: selectorPopupDeleteCard,
  handleFormSubmit: ( {element, cardId} ) => {
    api.delCard(cardId)
      .then(() => {
        element.remove();
        popupDeleteCard.close()
      })
      .catch((error) => {
        console.log(error)
      })
  }
});
//вешаем слушатели на попап Удаления карточки
popupDeleteCard.setEventListeners();


//информация полученная с серввера
const getAllData = [api.getInitialCards(), api.getPersonInfo()]

Promise.all(getAllData)//думал вот не зря же Дмитрий Ханин написал про Promise.all
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
  name: profileName,
  info: profileProfession,
  avatar: profileAvatar
});

//Создаем класс для попап Ученый
const popupEditProfile = new PopupWithForm(
  selectorPopupEdit,
  (value) => {
    renderLoading(selectorPopupEdit, true);
    api.sendUserInformation({ name: value.name_input, about: value.job_input })
      .then(result => {
        userInformation.setUserInfo(result._id, result.name, result.about, result.avatar);
        popupEditProfile.close();
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        renderLoading(selectorPopupEdit, false);
      });
});

//Создаем класс для попап Аватар
const popupEditAvatar = new PopupWithForm(
  selectorPopupEditAvatar,
  (value) => {
    renderLoading(selectorPopupEditAvatar, true)
    api.editAvatar( {avatar: value.avatar_input} )
      .then(result => {
        userInformation.setUserInfo(result._id, result.name, result.about, result.avatar);
        popupEditAvatar.close();
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        renderLoading(selectorPopupEditAvatar, false);
      });
})


//навешиваем обработчики для попап Ученый
popupEditProfile.setEventListeners();
popupEditAvatar.setEventListeners();


//Открытие попапа Ученый на кнопку редактировать
popupOpenProfile.addEventListener('click', function() {
  const userGetInfo = userInformation.getUserInfo();
  popupName.value = userGetInfo.name;
  popupProfession.value = userGetInfo.info;
  popupEditProfile.open();
  // popupEditProfile.setEventListeners();
  validFormProfile.clearValidation();
});


//Открытие попапа Аватар на кнопку Иконку
profileAvatar.addEventListener('click', function() {
  // const userGetInfo = userInformation.getUserInfo();
  // popupAvatar.value = userGetInfo.avatar;
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

