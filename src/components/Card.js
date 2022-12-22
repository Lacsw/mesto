export class Card {
  constructor(data, templateSelector, userId, { handleCardClick, handleDeleteClick, handleLikeClick }) {
    this._data = data;
    this._ownerCardId = data.owner._id;
    this._userId = userId;
    this._getTemplate(templateSelector);
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate(templateSelector) {
    this._template = document.querySelector(templateSelector).content.querySelector('.card');
  }

  setLikeCounter(data) {
    this._likeCounterElement.textContent = data.likes.length;
    this._data.likes = data.likes;
    this._showLikes();
  }

  isLike() {
    return this._data.likes.some((like) => {
      return like._id == this._userId;
    });
  }

  _showLikes() {
    if (this.isLike()) {
      this._likeBtn.classList.add('card__like-btn_active');
    } else {
      this._likeBtn.classList.remove('card__like-btn_active');
    }
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
    this._likeBtn.addEventListener('click', () => this._handleLikeClick(this._data));
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
    this.setLikeCounter(this._data);

    this._isOwner();

    return this._element;
  }
}
