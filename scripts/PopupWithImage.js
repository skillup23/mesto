import Popup from './Popup.js'

export default class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._imagePopupPicture = this._popup.querySelector('.popup__photo');
    this._imagePopupCaption = this._popup.querySelector('.popup__textphoto');
 }

  open(name, link) {
    super.open();

    this._imagePopupPicture.src = link;
    this._imagePopupPicture.alt = name;
    this._imagePopupCaption.textContent = name;
  }
}