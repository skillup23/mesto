//Переменные редактирования раздела Ученый
const popupopen = document.querySelector('.profile__edit-button');
const pop = document.querySelector('.popup');
const popup = document.querySelector('.popup_type_edit');
const popupclose = popup.querySelector('.popup__close_edit');
const popupName = popup.querySelector('.form__item_profile_name');
const popupProfession = popup.querySelector('.form__item_profile_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const formElement = popup.querySelector('.form_type_edit');
//Переменные карточек массива
const elementTemplate = document.querySelector('.element_template').content;
const elements = document.querySelector('.elements');
//Переменные кнопки 'добавить карточку'
const popupopenAddcard = document.querySelector('.profile__add-button');
const popupAddcard = document.querySelector('.popup_type_new-card');
const popupcloseAddcard = popupAddcard.querySelector('.popup__close_addcard');
const formElementAddcard = popupAddcard.querySelector('.form_type_addcard');
//Переменные открытия фото
// const popupopenPhoto = document.querySelector('.element__foto_full');
const popupPhoto = document.querySelector('.popup_type_image');
const popupclosePhoto = popupPhoto.querySelector('.popup__close_mesto');
const photo = popupPhoto.querySelector('.popup__photo');
const textPhoto = popupPhoto.querySelector('.popup__textphoto');

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




//Функции....................................................................

//Функция открытия попапа
function openPopup(elem) {
  elem.classList.add('popup_active');
}

//Функция закрытия попапа
function closePopup(elem) {
  elem.classList.remove('popup_active');
}

//Функция внесения изменений при нажатии на сохранить и закрытие попапа Ученый
function handleFormSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = popupName.value;
  profileProfession.textContent = popupProfession.value;
  closePopup(popup);
}

//Функция перебора массива
function addcard() {
  initialCards.forEach(addcardMassiv);
}

//Функция добавление карточек из массива
function addcardMassiv(elem) {
  const htmlElement = elementTemplate.cloneNode(true);
  htmlElement.querySelector('.element__name-mesto').textContent = elem.name;
  htmlElement.querySelector('.element__foto').src = elem.link;

  setListeners(htmlElement);
  elements.appendChild(htmlElement);
}

//Функция создания новой карточки
function addcardOne(a, b) {
  const htmlElement = elementTemplate.cloneNode(true);
  htmlElement.querySelector('.element__name-mesto').textContent = a;
  htmlElement.querySelector('.element__foto').src = b;

  setListeners(htmlElement);
  elements.prepend(htmlElement);
}

//Функция слушателей удаления, лайка и попапа Фото
function setListeners(element) {
  //слушатель удалить карточку
  element.querySelector('.element__delete').addEventListener('click', cardDelete);
  //слушатель лайка
  element.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });
  //Открытие попапа Фото
  element.querySelector('.element__foto').addEventListener('click', function(evt) {
    openPopup(popupPhoto);
    const elementName = evt.target.closest('.element').querySelector('.element__name-mesto');
    const elementPhoto = evt.target.closest('.element__foto');
    photo.src = elementPhoto.src;
    textPhoto.textContent = elementName.textContent;
  });
}

//Функция добавления новой карточки при нажатии на сохранить и закрытие попапа
function handleFormSubmitAddcard (evt) {
  evt.preventDefault();
  const popupNamemesto = popupAddcard.querySelector('.form__item_namemesto').value;
  const popupLinkfoto = popupAddcard.querySelector('.form__item_linkfoto').value;

  addcardOne(popupNamemesto, popupLinkfoto);
  closePopup(popupAddcard);
}

//Функция удаления карточки при нажатии на корзинку
function cardDelete(evt) {
  evt.target.closest('.element').remove();
}



//Вызов функции перебора массива
addcard()




//Слушатели событий...................................................

//Открытие попапа Ученый на кнопку редактировать
popupopen.addEventListener('click', function() {
  popupName.value = profileName.textContent;
  popupProfession.value = profileProfession.textContent;
  openPopup(popup);
});

//Открытие попапа Карточка на кнопку 'добавить карточку'
popupopenAddcard.addEventListener('click', function() {
  formElementAddcard.reset();
  openPopup(popupAddcard);
});

//Закрытие попапа Ученый на крестик
popupclose.addEventListener('click', function() {
  closePopup(popup);
});

//Закрытие попапа 'добавить карточку' на крестик
popupcloseAddcard.addEventListener('click', function() {
  closePopup(popupAddcard);
});

//Закрытие попапа Фото на крестик
popupclosePhoto.addEventListener('click', function() {
  closePopup(popupPhoto);
});


//Сохранение изменений и закрытие попапа Ученый при нажатии на сохранить
formElement.addEventListener('submit', handleFormSubmit);

//Сохранение изменений и закрытие попапа при нажатии на сохранить
formElementAddcard.addEventListener('submit', handleFormSubmitAddcard);


//Закрытие попапа Ученый кликом на задний фон
pop.addEventListener('click', function(event) {
  if (event.target === event.currentTarget){
    closePopup(popup);
  };
})

//Закрытие попапа 'добавить карточку' кликом на задний фон
popupAddcard.addEventListener('click', function(event) {
  if (event.target === event.currentTarget){
    closePopup(popupAddcard);
  };
})

// Закрытие попапа Фото кликом на задний фон
popupPhoto.addEventListener('click', function(event) {
  if (event.target === event.currentTarget){
    closePopup(popupPhoto);
  };
})