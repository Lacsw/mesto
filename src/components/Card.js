export class Card {
  _data;
  _element;
  _cardImage;
  _template;
  templateSelector;

  constructor(data, templateSelector, handleCardClick) {
    this._data = data;
    this._getTemplate(templateSelector);
    this.handleCardClick = handleCardClick;
  }

  _getTemplate(templateSelector) {
    this._template = document.querySelector(templateSelector).content.querySelector('.card');
  }

  _like(evt) {
    evt.target.classList.toggle('card__like-btn_active');
  }

  setLikeCounter() {
    this._likeCounterElement.textContent = this._data.likes.length;
  }

  _delete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-btn').addEventListener('click', this._like);
    this._element.querySelector('.card__remove-btn').addEventListener('click', this._delete.bind(this));
    this._cardImage.addEventListener('click', () => this.handleCardClick(this._data));
  }

  createCard() {
    this._element = this._template.cloneNode(true);
    this._cardImage = this._element.querySelector('.card__image');
    this._likeCounterElement = this._element.querySelector('.card__like-counter');
    

    this._element.querySelector('.card__title').textContent = this._data.name;
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;

    this._setEventListeners();
    this.setLikeCounter();

    return this._element;
  }
}
