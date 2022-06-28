import {getRandomItemNoRepeat, getRandomItemRepeat, shuffle, getRandomValue} from './util.js';
//Генерируем случайные объекты
const SIMILAR_OBJECT_COUNT = 25;

const DESCRIPTIONS = [
  'Сидим с Кексом на пляже, учимся делать рандом',
  'Ловим мух',
  'Готовимся к полуночным тыг-дык'
];

const MIN_VALUE_LIKES = 15;
const MAX_VALUE_LIKES = 200;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Мария',
  'Федор',
  'Иван'
];

const mainId = Array.from({length: SIMILAR_OBJECT_COUNT}, (v, i) =>  i + 1);

const photoUrl = Array.from({length: SIMILAR_OBJECT_COUNT}, (v, i) =>  i + 1);

const idComments = [];
for (let i = 0; i < SIMILAR_OBJECT_COUNT; i++) {
  idComments.push(i);
  shuffle(idComments);
}

const createComments = () => ({
  id: getRandomItemNoRepeat(idComments),
  avatar: `img/avatar-${getRandomValue(1, 6)}.svg`,
  message: getRandomItemRepeat(MESSAGES),
  name: getRandomItemRepeat(NAMES),
});

const createObjectPhoto = () => ({
  id: getRandomItemNoRepeat(mainId),
  url: `photos/${getRandomItemNoRepeat(photoUrl)}.jpg`,
  description: getRandomItemRepeat(DESCRIPTIONS),
  likes: getRandomValue(MIN_VALUE_LIKES, MAX_VALUE_LIKES),
  comments: Array.from({ length: getRandomValue(MIN_VALUE_LIKES, MAX_VALUE_LIKES) }, createComments),
});

const createObjectPhotos = () => Array.from({length: SIMILAR_OBJECT_COUNT}, createObjectPhoto);
export {createObjectPhotos};
