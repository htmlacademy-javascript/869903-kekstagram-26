const getRandomValue = (min, max) => Math.round(Math.random() * (max - min) + min);

const getRandomItemNoRepeat = (arr) => {
  const randomElement = getRandomValue(0, arr.length - 1);
  const randomElementItem = arr[randomElement];
  arr.splice(randomElement, 1);
  return randomElementItem;
};

const getRandomItemRepeat = (elements) => elements[getRandomValue(0, elements.length - 1)];

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

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'blue';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 3000);
}

export {getRandomItemNoRepeat, getRandomItemRepeat, shuffle, getRandomValue, isEscapeKey, showAlert};
