//Закрытие и открытие модального окна
const buttonModal = document.querySelector('#upload-file');
const popupImg = document.querySelector('.img-upload__overlay');
const closePopupImg = document.querySelector('.img-upload__cancel');
const body = document.querySelector('body');

buttonModal.addEventListener('click', () => {
  popupImg.classList.remove('hidden');
  body.classList.add('modal-open');
});
closePopupImg.addEventListener('click', () => {
  popupImg.classList.add('hidden');
  body.classList.remove('modal-open');
});
document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    popupImg.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});
