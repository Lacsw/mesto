const showInputError = (formSelector, inputSelector, errorMessage) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(validatedObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validatedObj.errorClass);
};

const hideInputError = (formSelector, inputSelector) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(validatedObj.inputErrorClass);
  errorElement.classList.remove(validatedObj.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(formSelector, inputSelector);
  }
};

const setEventListeners = (formSelector) => {
  const inputList = Array.from(formSelector.querySelectorAll(validatedObj.inputSelector));
  const buttonSelector = formSelector.querySelector(validatedObj.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formSelector, inputElement);
      toggleButtonState(inputList, buttonSelector);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(validatedObj.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

function toggleButtonState(inputList, submitButtonSelector) {
  if (hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add(validatedObj.disabledButtonClass);
    submitButtonSelector.disabled = true;
  } else {
    submitButtonSelector.classList.remove(validatedObj.disabledButtonClass);
    submitButtonSelector.disabled = false;
  }
}

const validatedObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  disabledButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

enableValidation(validatedObj);
