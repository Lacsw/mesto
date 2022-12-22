import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

import { validateConfig } from '../utils/constants.js';

const popupTypeEditSelector = '.popup_type_edit';
const popupTypeAddSelector = '.popup_type_add';
const popupPictureSelector = '.popup_type_picture';
const popupConfirmSelector = '.popup_type_confirm';
const cardsContainerSelector = '.cards';

const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileJob = document.querySelector('.popup__input_type_job');
const profileEditBtn = document.querySelector('.profile__edit');
const profileAddBtn = document.querySelector('.profile__add-btn');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
  headers: {
    authorization: '9a596bd9-c6d6-4de4-b642-ea24a3ef64a1',
    'Content-Type': 'application/json',
  },
});

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

let userId = '';
const popupWithImage = new PopupWithImage(popupPictureSelector);
function createNewCard(item) {
  const cardItem = new Card(item, '.card-template', userId, {
    handleCardClick: (item) => popupWithImage.open(item),
    handleDeleteClick: () => {
      const popupWithConfirm = new PopupWithConfirm(popupConfirmSelector, {
        handleSubmitForm: (item) => {
          api.deleteCard(item);
          cardItem.delete();
          popupWithConfirm.close();
        },
      });
      popupWithConfirm.open(item);
    },
    handleLikeClick: (item) => {
      const isLike = cardItem.isLike();
      api.toggleLikes(item, isLike).then((res) => {
        cardItem.setLikeCounter(res);
      });
    },
  });
  const newCard = cardItem.createCard();
  return newCard;
}

const cardList = new Section(
  {
    renderer: (item) => {
      const card = createNewCard(item);
      cardList.addItem(card);
    },
  },
  cardsContainerSelector
);

api.getInitialCards().then((data) => {
  cardList.renderItems(data.reverse());
});

const user = new UserInfo({
  profileNameSelector: '.profile__name',
  profileJobSelector: '.profile__job',
  profileAvatarSelector: '.profile__image',
});

api.getUserInfo().then((data) => {
  user.setUserInfo(data);
  userId = data._id;
});

const profilePopup = new PopupWithForm(popupTypeEditSelector, {
  handleSubmitForm: (data) => {
    api.setUserInfo(data).then((res) => {
      user.setUserInfo(res);
    });
    profilePopup.close();
  },
});

function handleOpenProfilePopup() {
  const userData = user.getUserInfo();
  inputProfileName.value = userData.name;
  inputProfileJob.value = userData.about;
  formValidators['edit-form'].resetValidation();
  profilePopup.open();
}
profileEditBtn.addEventListener('click', handleOpenProfilePopup);

const addCardPopup = new PopupWithForm(popupTypeAddSelector, {
  handleSubmitForm: (data) => {
    api.addNewCard(data).then((res) => {
      const card = createNewCard(res);
      cardList.addItem(card);
    });
    addCardPopup.close();
  },
});

function handleOpenAddCardPopup() {
  addCardPopup.open();
  formValidators['add-form'].resetValidation();
}
profileAddBtn.addEventListener('click', handleOpenAddCardPopup);
