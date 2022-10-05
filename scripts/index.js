let editBtn = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close-btn');
let inputName = document.querySelector('.popup__input_type_name');
let inputJob = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__edit-form');

function popupOpen() {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  newName = inputName.value;
  newJob = inputJob.value;
  profileName.textContent = newName;
  profileJob.textContent = newJob;
  popupClose();
}

editBtn.addEventListener('click', popupOpen);
popupCloseBtn.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);
