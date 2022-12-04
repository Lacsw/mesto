import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { PopupWithImage } from './PopupWithImage.js';
import { Section } from './Section.js';

import { initialCards } from './variables/cards.js';
import { validatedObj } from './variables/validateConfig.js';

export const POPUP_OPENED_CLASS = 'popup_opened';

const popups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');
const popupTypePicture = document.querySelector('.popup_type_picture');
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

const cardsContainer = '.cards';

const eidtFormValidator = new FormValidator(validatedObj, formEditProfile);
const addCardValidator = new FormValidator(validatedObj, formAddCard);

eidtFormValidator.enableValidation();
addCardValidator.enableValidation();

// function showPicture(card) {
//   popupImage.src = card.link;
//   popupImage.alt = card.name;
//   popupImageCaption.textContent = card.name;
//   openPopup(popupTypePicture);
// }

const popupWithImage = new PopupWithImage('.popup_type_picture');

const cardList = new Section(
  {
    item: initialCards,
    renderer: (item) => {
      const card = new Card(item, '.card-template', (item) => popupWithImage.open(item));
      const cardElement = card.createCard();

      cardList.addItem(cardElement);
    },
  },
  cardsContainer
);
cardList.renderItems();

// function createCard(item) {
//   const card = new Card(item, '.card-template', showPicture);
//   const cardElement = card.createCard();
//   return cardElement;
// }

// function addCard(card) {
//   const newCardElement = createCard(card);
//   cardsContainer.prepend(newCardElement);
// }

// function renderCards() {
//   initialCards.forEach(addCard);
// }
// renderCards();

// _____

// function closeByEscape(evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// }

// function openPopup(popup) {
//   popup.classList.add(POPUP_OPENED_CLASS);
//   document.addEventListener('keydown', closeByEscape);
// }

// function closePopup(popup) {
//   popup.classList.remove(POPUP_OPENED_CLASS);
//   document.removeEventListener('keydown', closeByEscape);
// }

// popups.forEach((popup) => {
//   popup.addEventListener('click', function (evt) {
//     if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
//       closePopup(popup);
//     }
//   });
// });

function handleOpenProfilePopup() {
  inputProfileName.value = profileName.textContent;
  inputProfileJob.value = profileJob.textContent;
  eidtFormValidator.resetValidation();
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
  addCardValidator.resetValidation();
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
