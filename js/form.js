// Проверяем длину комментария
const commentInput = document.querySelector('.text__description');

const getLengthComment = commentInput.oninput = function (textarea, amount) {
  textarea = commentInput;
  amount = 139;
  if (textarea.value.length > amount) {
    commentInput.maxLength = '';
  }
};
getLengthComment();
