export class FormValidator {
  _validatedObj;
  _formSelector;
  _buttonSelector;
  _inputList;

  constructor(validatedObj, formSelector) {
    this._validatedObj = validatedObj;
    this._formSelector = formSelector;
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._validatedObj.inputSelector));
    this._buttonSelector = this._formSelector.querySelector(this._validatedObj.submitButtonSelector);
  }

  _showInputError(inputSelector, errorMessage) {
    const errorElement = this._formSelector.querySelector(`.${inputSelector.id}-error`);
    
    inputSelector.classList.add(this._validatedObj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validatedObj.errorClass);
  }

  _hideInputError(inputSelector) {
    const errorElement = this._formSelector.querySelector(`.${inputSelector.id}-error`);
    
    inputSelector.classList.remove(this._validatedObj.inputErrorClass);
    errorElement.classList.remove(this._validatedObj.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputSelector) {
    if (!inputSelector.validity.valid) {
      this._showInputError(inputSelector, inputSelector.validationMessage);
    } else {
      this._hideInputError(inputSelector);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  }

  resetValidation() {
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
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
    this._setEventListeners();
  }
}
