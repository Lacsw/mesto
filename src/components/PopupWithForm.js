import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmitForm }) {
    super({popupSelector});
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
    this._submitBtn = this._popupElement.querySelector('.popup__submit-btn');
    this._submitBtnText = this._submitBtn.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => (this._formValues[input.name] = input.value));

    return this._formValues;
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._handleSubmitForm(this._getInputValues());
  };

  renderLoading(isLoading, text) {
    if (isLoading) {
      this._submitBtn.textContent = text;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  //В рантайме не существует родительского метода setEventListener и родительский open будет вызывать переопределенный setEventListeners.
  //А он не имеет всех необходимых обработчиков.
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleSubmit);
  }

  close() {
    this._formElement.reset();
    this._formElement.removeEventListener('submit', this._handleSubmit);
    super.close();
  }
}
