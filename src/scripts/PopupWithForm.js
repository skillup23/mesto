import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
  constructor( {popupSelector, handleFormSubmit} ) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submit = this._submit.bind(this);
 }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.form__item');
    
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    
    return this._formValues;
  }

  _submit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this.close();
  }

  setEventListeners() {
    this._popup.addEventListener('submit', this._submit);
    super.setEventListeners();
  }

  close() {
    super.close();
  }
}