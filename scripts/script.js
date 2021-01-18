//объявляем все переменные
const popupopen = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup__edit');
const popupclose = popup.querySelector('.popup__close_edit');
const popupName = popup.querySelector('.form__item_profile_name');
const popupProfession = popup.querySelector('.form__item_profile_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const formElement = popup.querySelector('.form__edit');
//Переменные карточек
const elementTemplate = document.querySelector('.element_template').content;
const elements = document.querySelector('.elements');
//Переменные кнопки 'добавить карточку'
const popupopenAddcard = document.querySelector('.profile__add-button');
const popupAddcard = document.querySelector('.popup__add');
const popupcloseAddcard = popupAddcard.querySelector('.popup__close_addcard');
const formElementAddcard = popupAddcard.querySelector('.form__addcard');
//Переменные открытия фото
// const popupopenPhoto = document.querySelector('.element__foto_full');
const popupPhoto = document.querySelector('.popup__mesto');
const popupclosePhoto = popupPhoto.querySelector('.popup__close_mesto');
const photo = popupPhoto.querySelector('.popup__photo');
const textPhoto = popupPhoto.querySelector('.popup__textphoto');


//Функция открытия попапа редактирования и автозаполнения содержимого имени и профессии
let openPopup = function () {
  popup.classList.add('popup_active');
  popupName.value = profileName.textContent;
  popupProfession.value = profileProfession.textContent;
}

//Функция закрытия попапа редактирования
let closePopup = function () {
  popup.classList.remove('popup_active');
}

//Функция внесения изменений при нажатии на сохранить и закрытие попапа
function handleFormSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = popupName.value;
  profileProfession.textContent = popupProfession.value;
  closePopup();
}

//Сохранение изменений и закрытие попапа при нажатии на сохранить
formElement.addEventListener('submit', handleFormSubmit);

//Открытие попапа на кнопку редактировать
popupopen.addEventListener('click', openPopup);

//Закрытие попапа на крестик
popupclose.addEventListener('click', closePopup);

//Закрытие попапа кликом на задний фон
popup.addEventListener('click', function(event) {
  if (event.target === event.currentTarget){
    closePopup();
  }
})



// Код добавления массива............................................

//Массив
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



//Функция перебора массива
function addcard() {
  initialCards.forEach(addcardMassiv);
}

//Функция добавление карточек по template
function addcardMassiv(elem) {
  const htmlElement = elementTemplate.cloneNode(true);
  const elementName = htmlElement.querySelector('.element__name-mesto');
  const elementPhoto = htmlElement.querySelector('.element__foto');
  elementName.textContent = elem.name;
  elementPhoto.src = elem.link;

  //слушатель удалить карточку
  htmlElement.querySelector('.element__delete').addEventListener('click', cardDelete);
  //слушатель лайка
  htmlElement.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });
  //слушатель фото
  htmlElement.querySelector('.element__foto').addEventListener('click', function(evt) {
    evt.target.closest('.element__foto');
    popupPhoto.classList.add('popup_active');
    photo.src = elementPhoto.src;
    textPhoto.textContent = elementName.textContent;
  });
  elements.appendChild(htmlElement);
}

//Функция удаления карточки при нажатии на корзинку
function cardDelete(evt) {
  evt.target.closest('.element').remove();
}

//Вызов функции перебора массива
addcard()



// Код добавления попапа 'добавить карточку'............................................



//Функция открытия попапа 'добавить карточку'
let openPopupAdd = function () {
  popupAddcard.querySelector('.form__addcard').reset();
  popupAddcard.classList.add('popup_active');
}

//Функция закрытия попапа 'добавить карточку'
let closePopupAdd = function () {
  popupAddcard.classList.remove('popup_active');
}

//Открытие попапа на кнопку 'добавить карточку'
popupopenAddcard.addEventListener('click', openPopupAdd);

//Закрытие попапа 'добавить карточку' на крестик
popupcloseAddcard.addEventListener('click', closePopupAdd);

//Закрытие попапа 'добавить карточку' кликом на задний фон
popupAddcard.addEventListener('click', function(event) {
  if (event.target === event.currentTarget){
    closePopupAdd();
  }
})


//Функция создания новой карточки
function addcardOne(a, b) {
  const htmlElement = elementTemplate.cloneNode(true);
  const elementName = htmlElement.querySelector('.element__name-mesto');
  const elementPhoto = htmlElement.querySelector('.element__foto');
  elementName.textContent = a;
  elementPhoto.src = b;

  //слушатель удалить карточку
  htmlElement.querySelector('.element__delete').addEventListener('click', cardDelete);
  //слушатель лайка
  htmlElement.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });
  //слушатель фото
  htmlElement.querySelector('.element__foto').addEventListener('click', function(evt) {
    evt.target.closest('.element__foto');
    popupPhoto.classList.add('popup_active');
    photo.src = elementPhoto.src;
    textPhoto.textContent = elementName.textContent;
  });
  elements.prepend(htmlElement);
}

//Функция добавления новой карточки при нажатии на сохранить и закрытие попапа
function handleFormSubmitAddcard (evt) {
  evt.preventDefault();
  const popupNamemesto = popupAddcard.querySelector('.form__item_namemesto').value;
  const popupLinkfoto = popupAddcard.querySelector('.form__item_linkfoto').value;

  addcardOne(popupNamemesto, popupLinkfoto);
  closePopupAdd();
}

//Сохранение изменений и закрытие попапа при нажатии на сохранить
formElementAddcard.addEventListener('submit', handleFormSubmitAddcard);





//Функция открытия попапа фото
 function openPopupPhoto() {
  popupPhoto.classList.add('popup_active');
 }

//Функция закрытия попапа фото
let closePopupPhoto = function () {
  popupPhoto.classList.remove('popup_active');
}

//Открытие попапа фото при клике на изображение
// popupopenPhoto.addEventListener('click', function(evt) {
//   evt.target.openPopupPhoto();
// });

//Закрытие попапа фото на крестик
popupclosePhoto.addEventListener('click', closePopupPhoto);

//Закрытие попапа фото кликом на задний фон
popupPhoto.addEventListener('click', function(event) {
  if (event.target === event.currentTarget){
    closePopupPhoto();
  }
})