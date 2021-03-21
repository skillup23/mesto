export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  //поле не валидно
  _showInputError(inputElement) { 
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._config.errorClass);
  };

  //поле валидно 
  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    this._errorElement.classList.remove(this._config.errorClass);
    this._errorElement.textContent = '';
  };

  //проверка на валидность каждого поля input
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  //раскладываем поля формы и вещаем обработчики
  _setEventListeners() {
    //создаем из всех импутов массив
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState();
    //вешаем на каждый input из массива слушатель с проверкой на валидность и состояние кнопки сохранить
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };


  //публичный метод включения валидации
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();//уберем для каждой формы стандартное действие submit
    });

    this._setEventListeners();//метод раскладывания отдельный полей формы и вещающий обработчики
  }

  //проверка на валидность каждого поля input для кнопки сохранить
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  //принимаем массив полей ввода и элемент кнопки, состояние которой нужно менять
  _toggleButtonState() {
    if(this._hasInvalidInput()) { // Если есть хотя бы один невалидный инпут
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  //очистка форм от сохрненных ошибок валидации при открытии попапа
  clearValidation() {
    this._inputList.forEach(inputElement => {
			this._hideInputError(inputElement);
		})
    this._toggleButtonState();
  }
}