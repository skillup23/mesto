//Переменные редактирования раздела Ученый
const popupopen = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const popupclose = profilePopup.querySelector('.popup__close_edit');
const popupName = profilePopup.querySelector('.form__item_profile_name');
const popupProfession = profilePopup.querySelector('.form__item_profile_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const formElement = profilePopup.querySelector('.form_type_edit');
const buttonSaveProfile = profilePopup.querySelector('.popup__submit');//костыль
//Переменные карточек массива
const elementTemplate = document.querySelector('.element_template').content;
const elements = document.querySelector('.elements');
//Переменные кнопки 'добавить карточку'
const popupopenAddcard = document.querySelector('.profile__add-button');
const popupAddcard = document.querySelector('.popup_type_new-card');
const popupcloseAddcard = popupAddcard.querySelector('.popup__close_addcard');
const popupAddcardName = popupAddcard.querySelector('.form__item_namemesto');
const popupAddcardLink = popupAddcard.querySelector('.form__item_linkfoto');
const formElementAddcard = document.forms.addcard;
const buttonSaveAdd = formElementAddcard.querySelector('.popup__submit');//костыль
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
function openPopup(elem, elemen) {
  elem.classList.add('popup_active');
  elemen.classList.add('popup__submit_inactive');//костыль
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
const initialCardsNew = [
  {
      name: 'Париж',
      link: 'https://images.unsplash.com/photo-1549144511-f099e773c147'
  },
  {
      name: 'Марсель',
      link: 'https://files.enjourney.ru/upload/404b0a6a92d8c8d91a3b32ad6e24e02c/1920x0/c1951d140676fb5015799251dbf3b2fa.jpg'
  },
]; 

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
  // забираем размеку из HTML и клонируем элемент
    const cardElementNew = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)

  // вернём DOM-элемент карточки
    return cardElementNew;
  }


  generateCard() {
  // Запишем разметку в приватное поле _element. 
  // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
  // Добавим данные
    this._element.querySelector('.element__foto').src = this._link;
    this._element.querySelector('.element__name-mesto').textContent = this._name;
  // Вернём элемент наружу
    return this._element;
  }
}

initialCardsNew.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, '.element_template_type_default');
  // Создаём карточку и возвращаем наружу
  const cardElementNew = card.generateCard();

  // Добавляем в DOM
  elements.append(cardElementNew);
}); 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Функция перебора массива
function renderCards() {
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

  setListeners(htmlElement, elem);//передаем и шаблон и каждый элемент массива (объект из массива)
  addcard(elements, htmlElement);
}

//Функция добавления карточек
function addcard(container, cardElement) {
  container.prepend(cardElement);
}

//Функция слушателей удаления, лайка и попапа Фото
function setListeners(element, elem)  {
  //слушатель удалить карточку
  element.querySelector('.element__delete').addEventListener('click', cardDelete);
  //слушатель лайка
  element.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });
  //Открытие попапа Фото
  element.querySelector('.element__foto').addEventListener('click', function(evt) {
    openPopup(popupPhoto, buttonSaveProfile);//костыль
    photo.src = elem.link;
    photo.alt = elem.name;
    textPhoto.textContent = elem.name;
  });
}





//Функция добавления новой карточки при нажатии на сохранить и закрытие попапа
function handleFormSubmitAddcard (evt) {
  evt.preventDefault();
  const object = {     // Привожу к объекту значения из формы
    name: popupAddcardName.value,
    link: popupAddcardLink.value
  };
  createCard(object);
  closePopup(popupAddcard);
}

//Функция удаления карточки при нажатии на корзинку
function cardDelete(evt) {
  evt.target.closest('.element').remove();
}



//Вызов функции перебора массива
renderCards()











//Слушатели событий...................................................

//Открытие попапа Ученый на кнопку редактироватьd
popupopen.addEventListener('click', function() {
  popupName.value = profileName.textContent;
  popupProfession.value = profileProfession.textContent;
  openPopup(profilePopup, buttonSaveProfile);//костыль
});

//Открытие попапа Карточка на кнопку 'добавить карточку'
popupopenAddcard.addEventListener('click', function() {
  formElementAddcard.reset();
  openPopup(popupAddcard, buttonSaveAdd);//костыль
});

//Закрытие попапа Ученый на крестик
popupclose.addEventListener('click', function() {
  closePopup(profilePopup);
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