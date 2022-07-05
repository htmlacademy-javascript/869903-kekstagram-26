import {isEscapeKey} from './util.js';
import {oneHashtag} from './form-validate.js';

//Закрытие и открытие модального окна
const buttonModal = document.querySelector('#upload-file');
const popupImg = document.querySelector('.img-upload__overlay');
const closePopupImg = document.querySelector('.img-upload__cancel');
const body = document.querySelector('body');
const description = document.querySelector('.text__description');
const img = document.querySelector('.img-upload__preview img');
const imgPreview = document.querySelector('.img-upload__preview img');
const sizeValue = document.querySelector('.scale__control--value');
const startValue = sizeValue.value;
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderElement = document.getElementById('slider');
const successModalTemplate = document.getElementById('success').content;
const errorModalTemplate = document.getElementById('error').content;


const createSuccessModal = () => {
  const successModalBlock = document.createElement('div');
  const successModal = successModalTemplate.cloneNode(true);
  successModalBlock.appendChild(successModal);
  body.appendChild(successModalBlock);
  const closeSuccessModalButton = successModalBlock.querySelector('.success__button');
  closeSuccessModalButton.addEventListener('click', () => {
    successModalBlock.remove();
  });
};

const createErrorModal = () => {
  const errorModalBlock = document.createElement('div');
  const errorModal = errorModalTemplate.cloneNode(true);
  errorModalBlock.appendChild(errorModal);
  body.appendChild(errorModalBlock);
  const closeErrorModalButton = errorModalBlock.querySelector('.error__button');
  closeErrorModalButton.addEventListener('click', () => {
    errorModalBlock.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      errorModalBlock.remove();
    }
  });
  body.addEventListener('click', () => {
    errorModalBlock.remove();
  });
};

const closeModal = () => {
  popupImg.classList.add('hidden');
  body.classList.remove('modal-open');
  img.classList.remove(img.classList[0]);
  imgPreview.style.transform = '';
  sizeValue.value = startValue;
  img.style.filter = 'none';
  sliderElement.classList.add('hidden');
};

closePopupImg.addEventListener('click', () => {
  closeModal();
});


document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    closeModal();
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

less.addEventListener('click', () => {
  if (parseInt(sizeValue.value, 10) > 25) {
    sizeValue.value = `${parseInt(sizeValue.value, 10) - 25  }%`;
    imgPreview.style.transform = `scale(${  sizeValue.value  })`;
  }
});

more.addEventListener('click', () => {

  if (parseInt(sizeValue.value, 10) < 100) {
    sizeValue.value = `${parseInt(sizeValue.value, 10) + 25  }%`;
    imgPreview.style.transform = `scale(${  sizeValue.value  })`;
  }
});

//Добавляем эффект на картинку
const effectsRadio = document.querySelectorAll('.effects__radio');
const effectsPreview = document.querySelectorAll('.effects__preview');

for (let i = 0; i < effectsRadio.length; i++) {
  effectsRadio[i].onchange = function () {
    img.classList.remove(img.classList[0]);
    img.classList.add(effectsPreview[i].classList[1]);
  };
}

//Регулировка насыщенности фильтра
effectLevelValue.value = 100;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.classList.add('hidden');

for (let i = 0; i < effectsRadio.length; i++){
  effectsRadio[i].addEventListener('change', () => {
    if (effectsRadio[i].value === 'chrome') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
      sliderElement.noUiSlider.on('update', () => {
        effectLevelValue.value = sliderElement.noUiSlider.get();
        img.style.filter = `grayscale(${  sliderElement.noUiSlider.get() })`;
      });
      sliderElement.classList.remove('hidden');

    } else if (effectsRadio[i].value === 'sepia') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
      sliderElement.noUiSlider.on('update', () => {
        img.style.filter = `sepia(${  sliderElement.noUiSlider.get() })`;
      });
      sliderElement.classList.remove('hidden');

    } else  if (effectsRadio[i].value === 'marvin') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100
        },
        start: 100,
        step: 1
      });
      sliderElement.noUiSlider.on('update', () => {
        img.style.filter = `invert(${  sliderElement.noUiSlider.get() }%)`;
      });
      sliderElement.classList.remove('hidden');

    } else if (effectsRadio[i].value === 'phobos') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      sliderElement.noUiSlider.on('update', () => {
        img.style.filter = `blur(${  sliderElement.noUiSlider.get() }px)`;
      });
      sliderElement.classList.remove('hidden');

    } else if (effectsRadio[i].value === 'heat') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      sliderElement.noUiSlider.on('update', () => {
        img.style.filter = `brightness(${  sliderElement.noUiSlider.get() })`;
      });
      sliderElement.classList.remove('hidden');

    } else if (effectsRadio[i].value === 'none') {
      sliderElement.noUiSlider.on('update', () => {
        img.style.filter = 'none';
      });
      sliderElement.classList.add('hidden');
    }
    else {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1
      });
      sliderElement.noUiSlider.set(100);
    }
  });
}

export {closeModal, createSuccessModal, createErrorModal, description};
