//объявляем все переменные
let popupopen = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup_edit');
let popupclose = popup.querySelector('.popup__close_edit');
let popupName = popup.querySelector('.form__item_profile_name');
let popupProfession = popup.querySelector('.form__item_profile_profession');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let formElement = popup.querySelector('.form__edit');

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

//Переменные карточек
const elementTemplate = document.querySelector('.element_template').content;
const elements = document.querySelector('.elements');

//Функция перебора массива
function addcard() {
  initialCards.forEach(addcardMassiv);
}

//Функция добавление карточек по template
function addcardMassiv(elem) {
  const htmlElement = elementTemplate.cloneNode(true);
  htmlElement.querySelector('.element__name-mesto').textContent = elem.name;
  htmlElement.querySelector('.element__foto').src = elem.link;

  elements.appendChild(htmlElement);
}

//Вызов функции перебора массива
addcard()



// Код добавления попапа 'добавить карточку'............................................

//Переменные кнопки 'добавить карточку'
let popupopenAddcard = document.querySelector('.profile__add-button');
let popupAddcard = document.querySelector('.popup_add');
let popupcloseAddcard = popupAddcard.querySelector('.popup__close_addcard');
let formElementAddcard = popupAddcard.querySelector('.form__addcard');

//Функция открытия попапа 'добавить карточку'
let openPopupAdd = function () {
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


//Функция добавления новой карточки
function addcardOne(a, b) {
  const htmlElement = elementTemplate.cloneNode(true);
  htmlElement.querySelector('.element__name-mesto').textContent = a;
  htmlElement.querySelector('.element__foto').src = b;

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

