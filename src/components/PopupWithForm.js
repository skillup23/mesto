import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
  constructor( {popupSelector, popupForm, handleFormSubmit} ) {
    super(popupSelector);
    // this._popup = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    // this._inputList = this._popup.querySelectorAll('.form__item');
    this._submit = this._submit.bind(this);
    this._form = document.querySelector(popupForm);
 }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.form__item');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.id] = input.value;// input.id - вызываем значение в основном файле js в функции handleFormSubmit для создания объета. можно использовать input.name, тогда в html данный полей нужно указать name="" и передавать в handleFormSubmit data.значениеname
    });
    return this._formValues;
  }

  _submit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    // this.close();
  }

  setEventListeners() {
    this._popup.addEventListener('submit', this._submit);
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}