export default class Popup {
  constructor(popupSelector) {
     this._popup = document.querySelector(popupSelector);
     this._handleEscClose = this._handleEscClose.bind(this);
     this._closePopupOverlay = this._closePopupOverlay.bind(this);
     this._closeButton = this._closeButton.bind(this);
 }

  open() {
    this._popup.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscClose);
    // this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscClose);
    // this._popup.removeEventListener('click', this._closePopupOverlay);
    // this._popup.querySelector('.popup__close').removeEventListener('click', this._closeButton);
  }

  _closeButton() {
    this.close();
  }


  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _closePopupOverlay(evt) {
    if (evt.target.classList.contains('popup_active')) { 
        this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._closePopupOverlay.bind(this));
    this._popup.querySelector('.popup__close').addEventListener('click', this._closeButton.bind(this));
  }

}