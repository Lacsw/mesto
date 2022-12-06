import { POPUP_OPENED_CLASS } from './index.js';

export class Popup {
  _popupElement;
  _popupSelector;

  constructor(popupSelector) {
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

  setEventListeners() {
    this._popupElement.addEventListener('click', this._hendleClickClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  open() {
    this.setEventListeners();
    this._popupElement.classList.add(POPUP_OPENED_CLASS);
  }

  close() {
    this._popupElement.classList.remove(POPUP_OPENED_CLASS);
    this._popupElement.removeEventListener('click', this._hendleClickClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
