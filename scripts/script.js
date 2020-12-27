//объявляем все переменные
let popupopen = document.querySelector('.profile__edit-botton');
let popup = document.querySelector('.popup');
let popupclose = popup.querySelector('.popup__close');
let popupName = popup.querySelector('.form__item_profile_name');
let popupProfession = popup.querySelector('.form__item_profile_profession');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let formElement = popup.querySelector('.popup__container');

//Функция открытия попапа и автозаполнения содержимого имени и профессии
let openPopup = function () {
  popup.classList.add('popup_active');
  popupName.value = profileName.textContent;
  popupProfession.value = profileProfession.textContent;
}

//Функция закрытия попапа
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