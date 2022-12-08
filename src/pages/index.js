import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';

import { initialCards, validateConfig } from '../utils/constants.js';

const popupTypeEditSelector = '.popup_type_edit';
const popupTypeAddSelector = '.popup_type_add';
const popupPictureSelector = '.popup_type_picture';
const cardsContainerSelector = '.cards';

const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileJob = document.querySelector('.popup__input_type_job');
const profileEditBtn = document.querySelector('.profile__edit');
const profileAddBtn = document.querySelector('.profile__add-btn');

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validateConfig);

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
  formValidators['edit-form'].resetValidation();
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
  formValidators['add-form'].resetValidation();
}
profileAddBtn.addEventListener('click', handleOpenAddCardPopup);
