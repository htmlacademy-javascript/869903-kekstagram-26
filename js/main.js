import {closeModal} from './photo-setting.js';
import {setUserFormSubmit} from './form-validate.js';
import {initPhotoFilter} from './miniatures.js';
import './full-photo.js';
import {getData} from './api.js';
import './upload-img.js';

getData((photo) => {
  initPhotoFilter(photo);
});
setUserFormSubmit(closeModal);
