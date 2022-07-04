import './create-random-array.js';
import {closeModal} from './photo-setting.js';
import {setUserFormSubmit} from './form-validate.js';
import {initPhotoFilter} from './miniatures.js';
import './full-photo.js';
import {geData} from './api.js';

geData((photo) => {
  initPhotoFilter(photo);
});
setUserFormSubmit(closeModal);
