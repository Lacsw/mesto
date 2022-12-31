export class Popup {
  _popupElement;
  _popupSelector;

  constructor({popupSelector}) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  _hendleClickClose = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
      this.close();
    }
  };

  _setEventListeners() {
    this._popupElement.addEventListener('click', this._hendleClickClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  open() {
    this._setEventListeners();
    this._popupElement.classList.add('popup_opened');
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    this._popupElement.removeEventListener('click', this._hendleClickClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
