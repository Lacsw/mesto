const POPUP_OPENED_CLASS = 'popup_opened';

const popups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');
const popupTypePicture = document.querySelector('.popup_type_picture');
const closeButtons = document.querySelectorAll('.popup__close-btn');
const inputPlaceName = document.querySelector('.popup__input_type_place-name');
const inputPlaceLink = document.querySelector('.popup__input_type_link');
const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileJob = document.querySelector('.popup__input_type_job');
const formEditProfile = document.querySelector('.popup__edit-form');
const formAddCard = document.querySelector('.popup__add-form');
const popupImage = popupTypePicture.querySelector('.popup__image');
const popupImageCaption = popupTypePicture.querySelector('.popup__image-caption');

const profileEditBtn = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileAddBtn = document.querySelector('.profile__add-btn');

const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;

function createCard(card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardElement.querySelector('.card__like-btn').addEventListener('click', (evt) => likeCard(evt));

  cardElement.querySelector('.card__remove-btn').addEventListener('click', () => cardElement.remove());
  cardImage.addEventListener('click', (evt) => showPicture(evt.target.alt, evt.target.src));

  return cardElement;
}

function showPicture(cardName, cardLink) {
  popupImage.src = cardLink;
  popupImage.alt = cardName;
  popupImageCaption.textContent = cardName;
  openPopup(popupTypePicture);
}

function likeCard(card) {
  card.target.classList.toggle('card__like-btn_active');
}

function addCard(card) {
  cardsContainer.prepend(createCard(card));
}

function renderCards() {
  initialCards.forEach((card) => {
    addCard(card);
  });
}
renderCards();

function handleKeydownClose(evt, popup) {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

function openPopup(popup) {
  popup.classList.add(POPUP_OPENED_CLASS);
  document.addEventListener('keydown', (evt) => {
    handleKeydownClose(evt, popup);
  });
}

function closePopup(popup) {
  popup.classList.remove(POPUP_OPENED_CLASS);
  document.removeEventListener('keydown', (evt) => {
    handleKeydownClose(evt, popup);
  });
}
popups.forEach((popup) => {
  const popupContainer = popup.querySelector('.popup__container');
  const imageContainer = popup.querySelector('.popup__image-container');
  const popupCloseBtn = popup.querySelector('.popup__close-btn');

  popup.addEventListener('click', function (evt) {
    if (
      (popupContainer && !popupContainer.contains(evt.target)) ||
      (imageContainer && !imageContainer.contains(evt.target)) ||
      evt.target === popupCloseBtn
    ) {
      closePopup(popup);
    }
  });
});

function handleOpenProfilePopup() {
  inputProfileName.value = profileName.textContent;
  inputProfileJob.value = profileJob.textContent;
  openPopup(popupTypeEdit);
}

function handleSubmitEditProfileForm(evt) {
  evt.preventDefault();
  const newName = inputProfileName.value;
  const newJob = inputProfileJob.value;
  profileName.textContent = newName;
  profileJob.textContent = newJob;
  closePopup(popupTypeEdit);
}

function handleOpenAddCardPopup() {
  openPopup(popupTypeAdd);
}

function handleSubmitAddCardForm(evt) {
  evt.preventDefault();
  const card = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value,
  };
  addCard(card);
  closePopup(popupTypeAdd);
  evt.target.reset();
}

profileEditBtn.addEventListener('click', handleOpenProfilePopup);
formEditProfile.addEventListener('submit', handleSubmitEditProfileForm);
profileAddBtn.addEventListener('click', handleOpenAddCardPopup);
formAddCard.addEventListener('submit', handleSubmitAddCardForm);
