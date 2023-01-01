import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

import {
  validateConfig,
  inputProfileName,
  inputProfileJob,
  profileAddBtn,
  profileEditBtn,
  profileAvatarBtn,
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
  headers: {
    authorization: '9a596bd9-c6d6-4de4-b642-ea24a3ef64a1',
    'Content-Type': 'application/json',
  },
});

let userId = '';
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    user.setUserInfo(userData);
    cardList.renderItems(cards.reverse());
  })
  .catch((e) => console.log(e));

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

const popupWithConfirm = new PopupWithConfirm({
  popupSelector: '.popup_type_confirm',
  handleSubmitForm: (item) => {
    api
      .deleteCard(item._data)
      .then(() => {
        item.delete();
        popupWithConfirm.close();
      })
      .catch((e) => {
        console.log(e);
      });
  },
});

const popupWithImage = new PopupWithImage({ popupSelector: '.popup_type_picture' });

function createNewCard(item) {
  const cardItem = new Card(item, '.card-template', userId, {
    handleCardClick: (item) => popupWithImage.open(item),
    handleDeleteClick: () => {
      popupWithConfirm.open(cardItem);
    },
    handleLikeClick: (item) => {
      const isLike = cardItem.isLike();
      api
        .toggleLikes(item, isLike)
        .then((res) => {
          cardItem.setLikeCounter(res);
        })
        .catch((e) => {
          console.log(e);
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
  '.cards'
);

const user = new UserInfo({
  profileNameSelector: '.profile__name',
  profileJobSelector: '.profile__job',
  profileAvatarSelector: '.profile__image',
});

const profilePopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleSubmitForm: (data) => {
    profilePopup.renderLoading(true, 'Сохранение...');
    api
      .setUserInfo(data)
      .then((res) => {
        user.setUserInfo(res);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        profilePopup.renderLoading(false);
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

const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleSubmitForm: (data) => {
    addCardPopup.renderLoading(true, 'Сохранение...');
    api
      .addNewCard(data)
      .then((res) => {
        const card = createNewCard(res);
        cardList.addItem(card);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        addCardPopup.renderLoading(false);
      });
    addCardPopup.close();
  },
});

function handleOpenAddCardPopup() {
  addCardPopup.open();
  formValidators['add-form'].resetValidation();
}
profileAddBtn.addEventListener('click', handleOpenAddCardPopup);

const avatarUpdatePopup = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleSubmitForm: (data) => {
    avatarUpdatePopup.renderLoading(true, 'Сохранение...');
    api
      .updateAvatar(data)
      .then((res) => {
        user.setAvatar(res);
        avatarUpdatePopup.close();
      })
      .catch((e) => console.log(e))
      .finally(() => {
        avatarUpdatePopup.renderLoading(false);
      });
  },
});

function handleOpenAvatarUpdatePopup() {
  avatarUpdatePopup.open();
  formValidators['avatar-form'].resetValidation();
}
profileAvatarBtn.addEventListener('click', handleOpenAvatarUpdatePopup);
