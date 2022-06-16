import {isEscapeKey} from './util.js';
import {oneHashtag} from './form-validate.js';

//Закрытие и открытие модального окна
const buttonModal = document.querySelector('#upload-file');
const popupImg = document.querySelector('.img-upload__overlay');
const closePopupImg = document.querySelector('.img-upload__cancel');
const body = document.querySelector('body');
const description = document.querySelector('.text__description');
const img = document.querySelector('.img-upload__preview img');
const imgPreview = document.querySelector('.img-upload__preview');
const sizeValue = document.querySelector('.scale__control--value');
const startValue = sizeValue.value;

closePopupImg.addEventListener('click', () => {
  popupImg.classList.add('hidden');
  body.classList.remove('modal-open');
  img.classList.remove(img.classList[0]);
  imgPreview.style.transform = '';
  sizeValue.value = startValue;
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    document.querySelector('.text__hashtags').blur();
    popupImg.classList.add('hidden');
    body.classList.remove('modal-open');
    img.classList.remove(img.classList[0]);
    imgPreview.style.transform = '';
    sizeValue.value = startValue;
  }
});
oneHashtag.addEventListener('keydown', (evt) => {
  if (document.hasFocus()) {
    evt.stopPropagation();
  }
});
description.addEventListener('keydown', (evt) => {
  if (document.hasFocus()) {
    evt.stopPropagation();
  }
});

buttonModal.addEventListener('click', () => {
  popupImg.classList.remove('hidden');
  body.classList.add('modal-open');
});

// Увеличение и уменьшение картинки
const less = document.querySelector('.scale__control--smaller');
const more = document.querySelector('.scale__control--bigger');

less.onclick = function () {
  if (parseInt(sizeValue.value, 10) > 25) {
    sizeValue.value = `${parseInt(sizeValue.value, 10) - 25  }%`;
    imgPreview.style.transform = `scale(${  sizeValue.value  })`;
  }
};
more.onclick = function () {

  if (parseInt(sizeValue.value, 10) < 100) {
    sizeValue.value = `${parseInt(sizeValue.value, 10) + 25  }%`;
    imgPreview.style.transform = `scale(${  sizeValue.value  })`;
  }
};

//Добавляем эффект на картинку
const effectsRadio = document.querySelectorAll('.effects__radio');
const effectsPreview = document.querySelectorAll('.effects__preview');

for (let i = 0; i < effectsRadio.length; i++) {
  effectsRadio[i].onchange = function () {
    img.classList.remove(img.classList[0]);
    img.classList.add(effectsPreview[i].classList[1]);
  };
}
