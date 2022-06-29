import {showAlert} from './util.js';
import {sendData} from './api.js';

const MAX_LENGTH = 20;
const MAX_QUANTITY = 5;
const form = document.querySelector('.img-upload__form');
const oneHashtag = document.querySelector('.text__hashtags');
const buttonSubmit = document.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

const validateHashtagsQuantity = (value) => {
  const arrHashtags = value.split(/\s+/);

  if (arrHashtags.length <= MAX_QUANTITY) {
    return true;
  }
};

const validateHashtagsLength = (value) => {
  const arrHashtags = value.split(/\s+/);

  for (const hashtag of arrHashtags) {
    if (hashtag.length >= MAX_LENGTH) {
      return false;
    }
  }
  return true;
};

const validateHashtagsOriginal = (value) => {
  const arrHashtags = value.trim().toLowerCase().split(/\s+/);

  for (let i = 0; i < arrHashtags.length; i++) {
    if (arrHashtags.slice(i + 1).includes(arrHashtags[i])) {
      return false;
    }
  }
  return true;
};

const validateHashtagsSymbols = (value) => {
  const arrHashtags = value.split(/\s+/);
  const re = /^#[A-Za-zA-Яа-яЁё0-9]{1,19}/;

  for (const hashtag of arrHashtags) {
    if (oneHashtag.value === '') {
      return true;
    } else if (re.test(hashtag)){
      return true;
    }
  }
  return false;
};

pristine.addValidator(oneHashtag, validateHashtagsQuantity, 'допустимо не более 5 хештегов');
pristine.addValidator(oneHashtag, validateHashtagsLength, 'допустимая длина хештега от 2 до 20 символов');
pristine.addValidator(oneHashtag, validateHashtagsOriginal, 'хештеги не должны повторяться');
pristine.addValidator(oneHashtag, validateHashtagsSymbols, 'хештег должен начинаться с # и должнен состоять из букв и чисел');

function blockSendButton() {
  buttonSubmit.setAttribute('disabled', 'disabled');
  buttonSubmit.textContent = 'Публикую!';
}

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSendButton();
      sendData(
        () => onSuccess(),
        () => showAlert('Не удалось отправить форму. Попробуйте ещё раз'),
        new FormData(evt.target),
      );
    }
  });
};

export {oneHashtag, setUserFormSubmit, buttonSubmit};
