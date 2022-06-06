"use strict";
//Закрытие и открытие модального окна
let buttonModal = document.querySelector('#upload-file');
let popupImg = document.querySelector('.img-upload__overlay');
let closePopupImg = document.querySelector('.img-upload__cancel');
let body = document.querySelector('body');

buttonModal.addEventListener('click', function () {
  popupImg.classList.remove('hidden');
  body.classList.add('modal-open')
});
closePopupImg.addEventListener('click', function () {
  popupImg.classList.add('hidden');
  body.classList.remove('modal-open')
});
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    popupImg.classList.add('hidden');
    body.classList.remove('modal-open')
  }
});

//Уменьшение и увеличение размера изображения
let less = document.querySelector('.scale__control--smaller');
let more = document.querySelector('.scale__control--bigger');
let sizeValue = document.querySelector('.scale__control--value');
let imgPreview = document.querySelector('.img-upload__preview');

less.onclick = function () {
  if (parseInt(sizeValue.value) > 0) {
    sizeValue.value = parseInt(sizeValue.value) - 25 + '%';
    imgPreview.style.transform = 'scale(' + sizeValue.value + ')';
  }
}
more.onclick = function () {
  if (parseInt(sizeValue.value) < 100) {
    sizeValue.value = parseInt(sizeValue.value) + 25 + '%';
    imgPreview.style.transform = 'scale(' + sizeValue.value + ')';
  }
}

//Добавляем эффект на картинку
let effectsRadio = document.querySelectorAll('.effects__radio');
let img = document.querySelector('img');
let effectsPreview = document.querySelectorAll('.effects__preview');
for (let i = 0; i < effectsRadio.length; i++) {
  for (let i = 0; i < effectsPreview.length; i++) {
    effectsRadio[i].onchange = function () {
      img.classList.remove(img.classList[0]);
      img.classList.add(effectsPreview[i].classList[1])
    }
  }
}

//Настройка слайдера
let slider = document.getElementById('slider');
let filter = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

noUiSlider.create(slider, {
  start: 1,
  step: 0.1,
  range: {
    'min': 0,
    'max': 1
  },

});


  slider.noUiSlider.on('update', function () {
    for (let i = 0; i < filter.length; i++) {
      for (let j = 0; j < effectsRadio.length; j++) {
            img.style.filter = effectsRadio[j].value + '(' + slider.noUiSlider.get() + ')';
            console.log(effectsRadio[j].value);
      }
    }
  })



// Проверяем длину комментария
let commentInput = document.querySelector('.text__description');

  let getLengthComment = commentInput.oninput = function (textarea, amount) {
    textarea = commentInput;
    amount = 139;
  if (textarea.value.length > amount) {
    commentInput.maxLength = '';
  }
}
getLengthComment();




