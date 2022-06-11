const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsBlock = bigPicture.querySelector('.social__comments');

const getCreateComment = (comment) => {
  const newComment  = document.createElement('li');
  newComment.classList.add('social__comment');
  const commentImage = document.createElement('img');
  commentImage.classList.add('social__picture');
  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  commentImage.width = 35;
  commentImage.height = 35;
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

const openBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  getCreateComments(photo.comments);

  closeButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    commentsCount.classList.remove('hidden');
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      bigPicture.classList.add('hidden');
      body.classList.remove('modal-open');
    }
  });
};

export {openBigPicture};
