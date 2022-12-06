import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { Section } from './Section.js';
import { UserInfo } from './UserInfo.js';

import { initialCards, validateConfig } from './utils/constants.js';

const popupTypeEditSelector = '.popup_type_edit';
const popupTypeAddSelector = '.popup_type_add';
const popupPictureSelector = '.popup_type_picture';
const cardsContainerSelector = '.cards';

const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileJob = document.querySelector('.popup__input_type_job');
const formEditProfile = document.querySelector('.popup__edit-form');
const formAddCard = document.querySelector('.popup__add-form');

const profileEditBtn = document.querySelector('.profile__edit');
const profileAddBtn = document.querySelector('.profile__add-btn');

const eidtFormValidator = new FormValidator(validateConfig, formEditProfile);
const addCardValidator = new FormValidator(validateConfig, formAddCard);
eidtFormValidator.enableValidation();
addCardValidator.enableValidation();

const popupWithImage = new PopupWithImage(popupPictureSelector);

function createNewCard(item) {
  return new Card(item, '.card-template', (item) => popupWithImage.open(item)).createCard();
}

const cardList = new Section(
  {
    item: initialCards,
    renderer: (item) => {
      const card = createNewCard(item);
      cardList.addItem(card);
    },
  },
  cardsContainerSelector
);
cardList.renderItems();

const user = new UserInfo({
  profileNameSelector: '.profile__name',
  profileJobSelector: '.profile__job',
});

const profilePopup = new PopupWithForm(popupTypeEditSelector, {
  handleSubmitForm: (data) => {
    user.setUserInfo(data);
    profilePopup.close();
  },
});

function handleOpenProfilePopup() {
  const userData = user.getUserInfo();
  inputProfileName.value = userData.name;
  inputProfileJob.value = userData.job;
  eidtFormValidator.resetValidation();
  profilePopup.open();
}
profileEditBtn.addEventListener('click', handleOpenProfilePopup);

const addCardPopup = new PopupWithForm(popupTypeAddSelector, {
  handleSubmitForm: (data) => {
    const newCard = {
      name: data['place-name'],
      link: data['link'],
    };
    const card = createNewCard(newCard);
    cardList.addItem(card);

    addCardPopup.close();
  },
});

function handleOpenAddCardPopup() {
  addCardPopup.open();
  addCardValidator.resetValidation();
}
profileAddBtn.addEventListener('click', handleOpenAddCardPopup);
