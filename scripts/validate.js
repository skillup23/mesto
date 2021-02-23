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
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._inputList.forEach(inputElement => {
			this._hideInputError(inputElement);
		})
  }

  //проверка при открытии попапа для кнопки сохранить 
  buttonStateInactive() {
    // this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    // this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    this._inputList.forEach( () => {
			this._toggleButtonState();
      // this._buttonElement.classList.add(this._config.inactiveButtonClass);
		})
  }

}













// //функция появления ошибки при не валидации
// const showInputError = (formElement, inputElement, errorMessage, selectors) => { 
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add(selectors.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(selectors.errorClass);
// };

// //функция скрытия ошибки при валидации
// const hideInputError = (formElement, inputElement, selectors) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(selectors.inputErrorClass);
//   errorElement.classList.remove(selectors.errorClass);
//   errorElement.textContent = '';
// };

// //функция на валидность
// const checkInputValidity = (formElement, inputElement, selectors) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
//   } else {
//     hideInputError(formElement, inputElement, selectors);
//   }
// };


// //раскладываем поля input в форму на отдельные
// const setEventListeners = (formElement, selectors) => {
//   const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
//   const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
//   toggleButtonState(inputList, buttonElement, selectors);
//   //вешаем на каждый input слушатель с проверкой на валидность и состояние кнопки сохранить
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement, selectors);
//       toggleButtonState(inputList, buttonElement, selectors);
//     });
//   });
// };

// //раскладываем формы на отдельные
// function enableValidation(selectors) {
//   const formList = Array.from(document.querySelectorAll(selectors.formSelector));// Найдём все формы и сделаем из них массив
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', function (evt) {
//       evt.preventDefault();//уберем для каждой формы стандартное действие submit
//     });
//     const fieldsetList = Array.from(formElement.querySelectorAll(selectors.setSelector));
//     fieldsetList.forEach((fieldset) => {
//       setEventListeners(fieldset, selectors)
//     });
//   });
// }

// //вызываем основную функцию с объектом, остальные получают его по цепочке, так как вызываются в этой функции и последующих
// // enableValidation({
// //   formSelector: '.form',
// //   inputSelector: '.form__item',
// //   setSelector: '.form__set',
// //   submitButtonSelector: '.form__submit',
// //   inactiveButtonClass: 'popup__submit_inactive',
// //   inputErrorClass: 'form__item_type_error',
// //   errorClass: 'form__input-error_active'
// // });

// //проверка на валидность каждого поля input
// function hasInvalidInput(inputList) {
//   return inputList.some(function(inputElement) {
//     return !inputElement.validity.valid;
//   })
// }

// // Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
// function toggleButtonState(inputList, buttonElement, selectors) {
//   if(hasInvalidInput(inputList)) {                          // Если есть хотя бы один невалидный инпут
//     buttonElement.classList.add(selectors.inactiveButtonClass);
//   } else {
//     buttonElement.classList.remove(selectors.inactiveButtonClass);
//   }
// }
