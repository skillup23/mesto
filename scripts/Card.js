const popupPhoto = document.querySelector('.popup_type_image');
const popupclosePhoto = popupPhoto.querySelector('.popup__close_mesto');
const photo = popupPhoto.querySelector('.popup__photo');
const textPhoto = popupPhoto.querySelector('.popup__textphoto');

export default class Card {
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

    return cardElementNew;
  }


  generateCard() {
  // Запишем разметку в приватное поле _element. 
  // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners(); // добавим обработчики

    this._element.querySelector('.element__foto').src = this._link;
    this._element.querySelector('.element__name-mesto').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__foto').addEventListener('click', () => {
      this._handleOpenPopup();
    });

    popupclosePhoto.addEventListener('click', () => {
      this._handleClosePopup();
    });

    this._element.querySelector('.element__like').addEventListener('click', this._isLike);

    this._element.querySelector('.element__delete').addEventListener('click', this._deleteCard);
  }
  
  _handleOpenPopup() {
    photo.src = this._link;
    photo.alt = this._name;
    textPhoto.textContent = this._name;

    popupPhoto.classList.add('popup_active');
    popupPhoto.addEventListener('click', this._closeOverlay);
    document.addEventListener('keydown', this._closeOverlayEsc);
  }
  
  _handleClosePopup() {
    photo.src = '';
    photo.alt = '';
    textPhoto.textContent = '';

    popupPhoto.classList.remove('popup_active');
    popupclosePhoto.removeEventListener('click', this._handleClosePopup);
    popupPhoto.removeEventListener('click', this._closeOverlay);
    document.removeEventListener('keydown', this._closeOverlayEsc);
  }

  _closeOverlay(event) {
    if (event.target === event.currentTarget){
      popupPhoto.classList.remove('popup_active');
    }
  }

  _closeOverlayEsc(event) {
    if (event.key === 'Escape') {
      popupPhoto.classList.remove('popup_active');
    }
  }

  _isLike(event) {
    event.target.classList.toggle('element__like_active');
  }

  _deleteCard(event) {
    event.target.closest('.element').remove();
  }
}