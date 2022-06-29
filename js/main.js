import './create-random-array.js';
import {closeModal} from './photo-setting.js';
import {setUserFormSubmit} from './form-validate.js';
import {createSimilarList} from './miniatures.js';
import './full-photo.js';
import {geData} from './api.js';

geData((photo) => {
  createSimilarList(photo);
});

setUserFormSubmit(closeModal);
