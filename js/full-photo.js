import {isEscapeKey} from './util.js';

const COMMENT_LOAD = 5;
const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsBlock = bigPicture.querySelector('.social__comments');
const commentImageSize = 35;

const getCreateComment = (comment) => {
  const newComment  = document.createElement('li');
  newComment.classList.add('social__comment');
  const commentImage = document.createElement('img');
  commentImage.classList.add('social__picture');
  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  commentImage.width = commentImageSize;
  commentImage.height = commentImageSize;
  newComment.appendChild(commentImage);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;
  newComment.appendChild(commentText);
  return newComment;
};

const getCreateComments = (comments) => {
  commentsBlock.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    commentsFragment.appendChild(getCreateComment(comment));
  });
  commentsBlock.appendChild(commentsFragment);
};

const fillComments = () => {
  const socialComments = bigPicture.querySelectorAll('.social__comment');

  for (let i = COMMENT_LOAD; i < socialComments.length; i++) {
    socialComments[i].style.display = 'none';
  }

  if (socialComments.length <= COMMENT_LOAD) {
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    bigPicture.querySelector('.social__comment-count').innerHTML = `${socialComments.length} из <span class="comments-count">${socialComments.length}</span> комментариев`;
  } else {
    let commentCounter = COMMENT_LOAD;
    bigPicture.querySelector('.social__comment-count').innerHTML = `${commentCounter} из <span class="comments-count">${socialComments.length}</span> комментариев`;

    const commentsCountValue = () => {
      commentCounter += COMMENT_LOAD;
      if (commentCounter <= socialComments.length) {
        for (let i = commentCounter - COMMENT_LOAD; i < commentCounter; i++) {
          socialComments[i].style.display = '';
        }
        bigPicture.querySelector('.social__comment-count').innerHTML = `${commentCounter} из <span class="comments-count">${socialComments.length}</span> комментариев`;
      }
      if (commentCounter >= socialComments.length) {
        for (let i = commentCounter - COMMENT_LOAD; i < socialComments.length; i++) {
          socialComments[i].style.display = '';
        }
        bigPicture.querySelector('.comments-loader').classList.add('hidden');
        bigPicture.querySelector('.comments-loader').removeEventListener('click', commentsCountValue);
      }
      if (commentCounter > socialComments.length) {
        bigPicture.querySelector('.social__comment-count').innerHTML = `${socialComments.length} из <span class="comments-count">${socialComments.length}</span> комментариев`;
      }
    };

    bigPicture.querySelector('.comments-loader').addEventListener('click', commentsCountValue);
  }
};

const openBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  getCreateComments(photo.comments);
  fillComments();

  closeButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    commentsCount.classList.remove('hidden');
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      bigPicture.classList.add('hidden');
      body.classList.remove('modal-open');
    }
  });
};

export {openBigPicture};
