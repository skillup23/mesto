//Переменные редактирования раздела Ученый
const popupopen = document.querySelector('.profile__edit-button');
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
  elem.addEventListener('click', closeOverlay);
}

//Функция закрытия попапа
function closePopup(elem) {
  elem.classList.remove('popup_active');
  elem.removeEventListener('click', closeOverlay);
}

//Функция закрытия попапа кликом по оверлею
function closeOverlay(event) {
  if (event.target === event.currentTarget){
    const popupActive = document.querySelector('.popup_active');
    closePopup(popupActive);
  }
}




//Функция внесения изменений при нажатии на сохранить и закрытие попапа Ученый
function handleFormSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = popupName.value;
  profileProfession.textContent = popupProfession.value;
  closePopup(popup);
}

//Функция перебора массива
function pereborMassiva() {
  initialCards.forEach(createCard);
}

// //Функция создания карточек
function createCard(elem) {
  const htmlElement = elementTemplate.cloneNode(true);
  const nameMestoElem = htmlElement.querySelector('.element__name-mesto');
  const fotoElem = htmlElement.querySelector('.element__foto');
  nameMestoElem.textContent = elem.name;
  fotoElem.src = elem.link;
  fotoElem.alt = elem.name;

  setListeners(htmlElement);
  addcard(elements, htmlElement);
}

//Функция добавления карточек
function addcard(container, cardElement) {
  container.prepend(cardElement);
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
    photo.alt = elementName.textContent;
    textPhoto.textContent = elementName.textContent;
  });
}

//Функция добавления новой карточки при нажатии на сохранить и закрытие попапа
function handleFormSubmitAddcard (evt) {
  evt.preventDefault();
  const object = {     // Привожу к объекту значения из формы
    name: popupAddcard.querySelector('.form__item_namemesto').value,
    link: popupAddcard.querySelector('.form__item_linkfoto').value
  };

  createCard(object);
  closePopup(popupAddcard);
}

//Функция удаления карточки при нажатии на корзинку
function cardDelete(evt) {
  evt.target.closest('.element').remove();
}



//Вызов функции перебора массива
pereborMassiva()



//Слушатели событий...................................................

//Открытие попапа Ученый на кнопку редактироватьd
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