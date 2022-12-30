import { PopupWithForm } from './PopupWithForm';

export class PopupWithConfirm extends PopupWithForm {
  constructor({ popupSelector, handleSubmitForm }) {
    super({ popupSelector, handleSubmitForm });
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._handleSubmitForm(this.data);
  };

  open(data) {
    this.data = data;
    super.open();
  }
}
