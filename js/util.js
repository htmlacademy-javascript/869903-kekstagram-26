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

export {getRandomItemNoRepeat, getRandomItemRepeat, shuffle, getRandomValue};
