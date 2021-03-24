// const popups = document.querySelectorAll('.popup')//находим все попапы
//Переменные редактирования раздела Ученый
export const popupOpenProfile = document.querySelector('.profile__edit-button');
export const profilePopup = document.querySelector('.popup_type_edit');
export const popupName = profilePopup.querySelector('.form__item_profile_name');
export const popupProfession = profilePopup.querySelector('.form__item_profile_profession');
export const profileName = document.querySelector('.profile__name');
export const profileProfession = document.querySelector('.profile__profession');
export const profileAvatar = document.querySelector('.profile__avatar');
export const formElement = profilePopup.querySelector('.form_type_edit');
//Переменные карточек массива
// const elements = document.querySelector('.elements');
//Переменные кнопки 'добавить карточку'
export const popupOpenAddCard = document.querySelector('.profile__add-button');
// const popupAddcard = document.querySelector('.popup_type_new-card');
// const popupAddcardName = popupAddcard.querySelector('.form__item_namemesto');
// const popupAddcardLink = popupAddcard.querySelector('.form__item_linkfoto');
export const formElementAddcard = document.querySelector('.form_type_addcard');
//Переменные открытия фото
// const popupPhoto = document.querySelector('.popup_type_image');
// const imagePopupPicture = popupPhoto.querySelector('.popup__photo');
// const imagePopupCaption = popupPhoto.querySelector('.popup__textphoto');
export const popupAvatar = document.querySelector('.form__item_linkavatar');
export const formElementAvatar = document.forms.editavatar;
export const elementTemplate = '.element_template_type_default';
export const elementSelector = '.elements';
export const selectorPopupNewCard = '.popup_type_new-card';
export const selectorPopupImage = '.popup_type_image';
export const selectorPopupDeleteCard = '.popup_type_delete-card';
export const selectorPopupEdit = '.popup_type_edit';
export const selectorPopupEditAvatar = '.popup_type_edit-avatar';

// конфиг для валидации
export const config = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
}

//функция Сохранение...
export function renderLoading(data, isLoading) {
  const popupTextSave = document.querySelector(data).querySelector('.popup__submit_save');
  if (isLoading) {
    popupTextSave.textContent = 'Сохранение...';
  }
  else {
    popupTextSave.textContent = 'Сохранить';
  }
}

// массив с карточками
export const initialCardsNew = [
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