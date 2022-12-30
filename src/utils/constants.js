const validateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  disabledButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

const inputProfileName = document.querySelector('.popup__input_type_name');
const inputProfileJob = document.querySelector('.popup__input_type_job');

const profileEditBtn = document.querySelector('.profile__edit');
const profileAddBtn = document.querySelector('.profile__add-btn');
const profileAvatarBtn = document.querySelector('.profile__avatar-btn');

export { validateConfig, inputProfileName, inputProfileJob, profileAddBtn, profileEditBtn, profileAvatarBtn };
