import Popup from './Popup.js'

export default class PopupWithDelete extends Popup {
  constructor( {popupSelector, handleFormSubmit} ) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._delete);
    })
    
    super.setEventListeners();
  }

  open(data) {
    super.open()
    this._delete = data
  }

  close() {
    super.close();
  }
}
