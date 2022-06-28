import {createObjectPhotos} from './create-random-array.js';
import {openBigPicture} from './full-photo.js';

const picturesElementsList = document.querySelector('.pictures');
const similarPhotosTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPhotos = createObjectPhotos();
const similarListFragment = document.createDocumentFragment();

const createSimilarList = (similarPhotos) => {
  similarPhotos.forEach((photo) => {
    const photoElement = similarPhotosTemplate.cloneNode(true);
    picturesElementsList.appendChild(photoElement);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.addEventListener('click', () => {
      openBigPicture(photo);
    });
    similarListFragment.appendChild(photoElement);
    picturesElementsList.appendChild(similarListFragment);
  });
}

export {picturesElementsList, similarPhotos, createSimilarList};
