export class Card {
  _data;
  _element;
  _cardImage;
  _template;
  showPicture;
  templateSelector;

  constructor(data, templateSelector, showPicture) {
    this._data = data;
    this._getTemplate(templateSelector);
    this.showPicture = showPicture;
  }

  _getTemplate(templateSelector) {
    this._template = document.querySelector(templateSelector).content.querySelector('.card');
  }

  _like(evt) {
    evt.target.classList.toggle('card__like-btn_active');
  }

  _openPicture() {
    this.showPicture(this._data);
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-btn').addEventListener('click', (evt) => this.like(evt));
    this._element.querySelector('.card__remove-btn').addEventListener('click', () => this._element.remove());
    this._cardImage.addEventListener('click', () => this._openPicture());
  }

  createCard() {
    this._element = this._template.cloneNode(true);
    this._cardImage = this._element.querySelector('.card__image');

    this._element.querySelector('.card__title').textContent = this._data.name;
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;

    this._setEventListeners();

    return this._element;
  }
}
