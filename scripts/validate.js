//функция появления ошибки при не валидации
const showInputError = (formElement, inputElement, errorMessage, selectors) => { 
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
};

//функция скрытия ошибки при валидации
const hideInputError = (formElement, inputElement, selectors) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = '';
};

//функция на валидность
const checkInputValidity = (formElement, inputElement, selectors) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
  } else {
    hideInputError(formElement, inputElement, selectors);
  }
};


//раскладываем поля input в форму на отдельные
const setEventListeners = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, selectors);
  //вешаем на каждый input слушатель с проверкой на валидность и состояние кнопки сохранить
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, selectors);
      toggleButtonState(inputList, buttonElement, selectors);
    });
  });
};

//раскладываем формы на отдельные
function enableValidation(selectors) {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));// Найдём все формы и сделаем из них массив
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();//уберем для каждой формы стандартное действие submit
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(selectors.setSelector));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset, selectors)
    });
  });
}

//вызываем основную функцию с объектом, остальные получают его по цепочке, так как вызываются в этой функции и последующих
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__item',
  setSelector: '.form__set',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
});
// enableValidation(selectors);

//проверка на валидность каждого поля input
function hasInvalidInput(inputList) {
  return inputList.some(function(inputElement) {
    return !inputElement.validity.valid;
  })
}

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
function toggleButtonState(inputList, buttonElement, selectors) {
  if(hasInvalidInput(inputList)) {                          // Если есть хотя бы один невалидный инпут
    buttonElement.classList.add(selectors.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
  }
}