import {createSuccessModal, createErrorModal, closeModal, description} from './photo-setting.js';
import {oneHashtag, buttonSubmit} from './form-validate.js';


const  geData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photo) => {
      onSuccess(photo);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        createSuccessModal();
        description.value = '';
        oneHashtag.value = '';
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
        closeModal();
        createErrorModal();
        buttonSubmit.removeAttribute('disabled');
        buttonSubmit.textContent = 'Опубликовать';
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
      createErrorModal();
    });
};

export {geData, sendData};
