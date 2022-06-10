import {createObjectPhotos} from './create-random-array.js';

const picturesElementsList = document.querySelector('.pictures');
const similarPhotosTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPhotos = createObjectPhotos();
const similarListFragment = document.createDocumentFragment();

similarPhotos.forEach(({url, comments, likes}) => {
  const photoElement = similarPhotosTemplate.cloneNode(true);
  picturesElementsList.appendChild(photoElement);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;
  similarListFragment.appendChild(photoElement);
});

picturesElementsList.appendChild(similarListFragment);

