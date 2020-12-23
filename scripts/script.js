const popupopen = document.querySelector('.profile__edit-botton');
const popup = document.querySelector('.popup');
const popupclose = popup.querySelector('.popup__close')
const popupsave = popup.querySelector('.popup__submit')

const togglePopup = function () {
  popup.classList.toggle('popup_active');
}

popupopen.addEventListener('click', togglePopup);
popupclose.addEventListener('click', togglePopup);
popupsave.addEventListener('click', togglePopup);

popup.addEventListener('click', function(event) {
  if (event.target === event.currentTarget){
    popup.classList.toggle('popup_active');
  }
})
// Конец кода про попап

// Ниже код автозаполнения форм при открытии попапа
const popupName = popup.querySelector('.popup__name');
const profileName = document.querySelector('.profile__name');
popupName.setAttribute('value', profileName.textContent);

const popupProfession = popup.querySelector('.popup__profession');
const profileProfession = document.querySelector('.profile__profession');
popupProfession.setAttribute('value', profileProfession.textContent);
// конец кода автозаолнения форм

// Ниже код с кнопкой Сохранить и изменением текста
const formElement = popup.querySelector('.popup__container');

function handleFormSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = popupName.value
  profileProfession.textContent = popupProfession.value
}

formElement.addEventListener('submit', handleFormSubmit);
// Конец кода с кнопкой Сохранить и изменением текста

//Делаем лайки

const like = document.querySelectorAll('.element__like')

like.forEach(function(clickLike){
	clickLike.addEventListener('click', function(){
    clickLike.setAttribute('src', '/images/like-active.svg')
  })
})
