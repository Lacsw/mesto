import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({popupSelector});
    this._popupImage = this._popupElement.querySelector('.popup__image');
    this._popupImageCaption = this._popupElement.querySelector('.popup__image-caption');
  }

  open(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupImageCaption.textContent = data.name;
    super.open();
  }
}
