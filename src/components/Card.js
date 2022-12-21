export class Card {
  constructor(data, templateSelector, userId, { handleCardClick, handleDeleteClick }) {
    this._data = data;
    this._ownerCardId = data.owner._id;
    this._userId = userId;
    this._getTemplate(templateSelector);
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
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

  delete() {
    this._element.remove();
    this._element = null;
  }

  _isOwner() {
    if (this._userId !== this._ownerCardId) {
      this._removeBtn.remove();
    }
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', this._like);
    this._removeBtn.addEventListener('click', () => this._handleDeleteClick(this._data));
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._data));
  }

  createCard() {
    this._element = this._template.cloneNode(true);
    this._cardImage = this._element.querySelector('.card__image');
    this._likeCounterElement = this._element.querySelector('.card__like-counter');
    this._removeBtn = this._element.querySelector('.card__remove-btn');
    this._likeBtn = this._element.querySelector('.card__like-btn');

    this._element.querySelector('.card__title').textContent = this._data.name;
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;

    this._setEventListeners();
    this.setLikeCounter();

    this._isOwner();

    return this._element;
  }
}
