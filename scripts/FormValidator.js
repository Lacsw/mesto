export class FormValidator {
  _validatedObj;
  _formSelector;

  constructor(validatedObj, formSelector) {
    this._validatedObj = validatedObj;
    this._formSelector = formSelector;
  }

  _showInputError(inputSelector, errorMessage, errorElement) {
    inputSelector.classList.add(this._validatedObj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validatedObj.errorClass);
  }

  _hideInputError(inputSelector, errorElement) {
    inputSelector.classList.remove(this._validatedObj.inputErrorClass);
    errorElement.classList.remove(this._validatedObj.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputSelector) {
    const errorElement = this._formSelector.querySelector(`.${inputSelector.id}-error`);
    
    if (!inputSelector.validity.valid) {
      this._showInputError(inputSelector, inputSelector.validationMessage, errorElement);
    } else {
      this._hideInputError(inputSelector, errorElement);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState(this._inputList, this._buttonSelector);
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  }

  toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonSelector.classList.add(this._validatedObj.disabledButtonClass);
      this._buttonSelector.disabled = true;
    } else {
      this._buttonSelector.classList.remove(this._validatedObj.disabledButtonClass);
      this._buttonSelector.disabled = false;
    }
  }

  enableValidation() {
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._validatedObj.inputSelector));
    this._buttonSelector = this._formSelector.querySelector(this._validatedObj.submitButtonSelector);

    this._setEventListeners();
  }
}
