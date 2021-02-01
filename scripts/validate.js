//функция появления ошибки при не валидации
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__item_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

//функция скрытия ошибки при валидации
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__item_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

//функция на валидность
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//раскладываем поля input в форму на отдельные
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__item'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};

//раскладываем формы на отдельные
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement)
  });
}

enableValidation();