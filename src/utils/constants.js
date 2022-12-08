const northOceanImage = new URL('../images/blake-cheek.jpeg', import.meta.url);
const elMatadoreImage = new URL('../images/el-matador-beach.jpeg', import.meta.url);
const mandasariImage = new URL('../images/pantai-mandasari.jpeg', import.meta.url);
const californiaImage = new URL('../images/california.jpeg', import.meta.url);
const stradbrokeImage = new URL('../images/stradbroke-island.jpeg', import.meta.url);

export const initialCards = [
  {
    name: 'Северо-Атлантический океан',
    link: northOceanImage,
  },
  {
    name: 'El Matador',
    link: elMatadoreImage,
  },
  {
    name: 'Мадасари',
    link: mandasariImage,
  },
  {
    name: 'Калифорния',
    link: californiaImage,
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
  {
    name: 'Страдброк',
    link: stradbrokeImage,
  },
];

export const validateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  disabledButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};
