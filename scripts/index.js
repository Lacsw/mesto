const POPUP_OPENED_CLASS = 'popup_opened';

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

const profileEditBtn = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileAddBtn = document.querySelector('.profile__add-btn');

const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;

const initialCards = [
  {
    name: 'Северо-Атлантический океан',
    link: './images/blake-cheek.jpeg',
  },
  {
    name: 'El Matador',
    link: './images/el-matador-beach.jpeg',
  },
  {
    name: 'Мадасари',
    link: './images/pantai-mandasari.jpeg',
  },
  {
    name: 'Калифорния',
    link: './images/california.jpeg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
  {
    name: 'Страдброк',
    link: './images/stradbroke-island.jpeg',
  },
];

function createCard(cardName, cardLink) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = cardName;
  cardImage.src = cardLink;
  cardImage.alt = cardName;

  cardElement
    .querySelector('.card__like-btn')
    .addEventListener('click', (evt) => evt.target.classList.toggle('card__like-btn_active'));

  cardElement.querySelector('.card__remove-btn').addEventListener('click', () => cardElement.remove());
  cardImage.addEventListener('click', (evt) => showPicture(evt.target.alt, evt.target.src));

  return cardElement;
}

function showPicture(cardName, cardLink) {
  popupTypePicture.querySelector('.popup__image').src = cardLink;
  popupTypePicture.querySelector('.popup__image-caption').textContent = cardName;
  openPopup(popupTypePicture);
}

function addCard(cardName, cardLink) {
  cardsContainer.prepend(createCard(cardName, cardLink));
}

function renderCards() {
  initialCards.forEach((item) => {
    addCard(item.name, item.link);
  });
}
renderCards();

function openPopup(popup) {
  popup.classList.add(POPUP_OPENED_CLASS);
}

function closePopup(popup) {
  popup.classList.remove(POPUP_OPENED_CLASS);
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function handleOpenProfilePopup() {
  openPopup(popupTypeEdit);
  inputProfileName.value = profileName.textContent;
  inputProfileJob.value = profileJob.textContent;
}

function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();
  let newName = inputProfileName.value;
  let newJob = inputProfileJob.value;
  profileName.textContent = newName;
  profileJob.textContent = newJob;
  closePopup(popupTypeEdit);
}

function handleOpenAddCardPopup() {
  openPopup(popupTypeAdd);
}

function formAddCardSubmitHandler(evt) {
  evt.preventDefault();
  addCard(inputPlaceName.value, inputPlaceLink.value);
  closePopup(popupTypeAdd);
  evt.target.reset();
}

profileEditBtn.addEventListener('click', handleOpenProfilePopup);
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
profileAddBtn.addEventListener('click', handleOpenAddCardPopup);
formAddCard.addEventListener('submit', formAddCardSubmitHandler);
