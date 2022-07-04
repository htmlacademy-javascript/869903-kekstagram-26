import {openBigPicture} from './full-photo.js';
import {debounce} from './util.js';

const picturesElementsList = document.querySelector('.pictures');
const similarPhotosTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarListFragment = document.createDocumentFragment();
const blockFilters = document.querySelector('.img-filters');
const randomFilterButton = blockFilters.querySelector('#filter-random');
const defaultFilterButton = blockFilters.querySelector('#filter-default');
const discussedFilterButton = blockFilters.querySelector('#filter-discussed');

const createSimilarList = (similarPhotos) => {
  const photos = document.querySelectorAll('.picture');
  for (let i = 0; i < photos.length; i++) {
    photos[i].remove();
  }
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
    blockFilters.classList.remove('img-filters--inactive');
  });
};

const getActiveFilterButtons = (currentButton) => {
  blockFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  currentButton.classList.add('img-filters__button--active');
};

const initPhotoFilter = (photo) => {
  createSimilarList(photo);

  const defaultFilter = debounce(() => {
    getActiveFilterButtons(defaultFilterButton);
    createSimilarList(photo);
  });

  const randomFilter = debounce(() => {
    getActiveFilterButtons(randomFilterButton);
    const randomPhotos = photo.slice();
    const shuffle = (array) => {
      let currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    };
    const randomPhotoArray = shuffle(randomPhotos).slice(0, 10);
    createSimilarList(randomPhotoArray);
  });

  const discussedFilter = debounce(() => {
    getActiveFilterButtons(discussedFilterButton);
    const compareDiscussedPhotos = (photoA, photoB) => photoB.comments.length - photoA.comments.length;
    const discussedPhotos = photo.slice();
    discussedPhotos.sort(compareDiscussedPhotos);
    createSimilarList(discussedPhotos);
  });

  defaultFilterButton.addEventListener('click', defaultFilter);
  randomFilterButton.addEventListener('click', randomFilter);
  discussedFilterButton.addEventListener('click', discussedFilter);
};

export {picturesElementsList, createSimilarList, initPhotoFilter};
