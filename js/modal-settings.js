import { resetFilter } from './photo-filters';
import { resetSettings } from './reset-settings';
import { imgOverlay } from './validation';

const imgUploadPreviwButtonClose = document.querySelector('.img-upload__cancel');
const commentField = document.querySelector('.text__description');
const hashtagField = document.querySelector('.text__hashtags');

const closeModal = () => { //Функция закрытия формы
  imgOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetSettings();
};

document.addEventListener('keydown', (evt) => { //Закрытие по Esc с проверкой фокуса нна хэштегах, комменнтах и присутствии активной ошибки.
  const errorMessage = document.querySelector('.error');
  if (evt.key === 'Escape' && !errorMessage) {
    if (document.activeElement !== commentField && document.activeElement !== hashtagField) {
      closeModal();
      evt.preventDefault();
    }
  }
});

export const openSuccefulMessage = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successTemplate.cloneNode(true);
  const successInner = successMessage.querySelector('.success__inner');
  const successfulSendingButton = successMessage.querySelector('.success__button');

  document.body.appendChild(successMessage);

  const closeSuccessMessage = () => {
    successMessage.remove();
    document.removeEventListener('keydown', onEscClose); // Удаляем обработчик на Esc
    document.removeEventListener('click',onOutsideClick);
    resetFilter();
    resetSettings();
    imgOverlay.classList.add('hidden');
  };

  function onEscClose (evt) {
    if (evt.key === 'Escape') {
      closeSuccessMessage();
    }
  }

  function onOutsideClick (evt) {
    if (!successInner.contains(evt.target)) {
      closeSuccessMessage();
    }
  }

  successfulSendingButton.addEventListener('click',closeSuccessMessage);
  document.addEventListener('keydown',onEscClose);
  document.addEventListener('click',onOutsideClick);

};

imgUploadPreviwButtonClose.addEventListener('click', closeModal);

//Функция для показа ошибки при загрузке
export const showError = () => {
  const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorElement = errorTemplate.cloneNode(true);

  document.body.appendChild(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, 5000);
};

export const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorTemplate.cloneNode(true);
  const errorInner = errorMessage.querySelector('.error__inner');
  const errorButton = errorMessage.querySelector('.error__button');

  document.body.appendChild(errorMessage);

  function removeErrorMessage () {
    errorMessage.remove();
    document.removeEventListener('keydown', onEscClose);
    document.removeEventListener('click', onOutsideClick);
  }
  function onEscClose (evt) {
    if (evt.key === 'Escape') {
      removeErrorMessage();
    }
  }

  // Закрытие по клику вне сообщения
  function onOutsideClick (evt) {
    if (!errorInner.contains(evt.target)) { //Проверка на то, что клик был не в зоне сообщения об ошибке
      removeErrorMessage();
    }
  }

  errorButton.addEventListener('click', removeErrorMessage);
  document.addEventListener('keydown', onEscClose);
  document.addEventListener('click', onOutsideClick);
};
