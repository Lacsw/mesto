export class Card {
  _data;
  _element;
  _cardImage;
  _template;
  _showPicture;

  constructor(data, showPicture) {
    this._data = data;
    this._getTemplate();
    this._showPicture = showPicture;
  }

  _getTemplate() {
    this._template = document.querySelector('.card-template').content.querySelector('.card');
  }

  like(evt) {
    evt.target.classList.toggle('card__like-btn_active');
  }

  openPicture(name, link) {
    this._showPicture(name, link);
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-btn').addEventListener('click', (evt) => this.like(evt));
    this._element.querySelector('.card__remove-btn').addEventListener('click', () => this._element.remove());
    this._cardImage.addEventListener('click', (evt) => this.openPicture(evt.target.alt, evt.target.src));
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
