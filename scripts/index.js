let profileEditBtn = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close-btn');
let inputName = document.querySelector('.popup__input_type_name');
let inputJob = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__edit-form');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function handleOpenProfilePopup () {
  openPopup();
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  let newName = inputName.value;
  let newJob = inputJob.value;
  profileName.textContent = newName;
  profileJob.textContent = newJob;
  closePopup();
}

profileEditBtn.addEventListener('click',  handleOpenProfilePopup);
popupCloseBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
