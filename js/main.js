const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const SIMILAR_PUBLICATION_COUNT = 25;

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createRandomUnique (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error(`Перебраны все числа из диапазона от ${min} до ${max}`); // eslint-disable-line no-console
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generatePostId = createRandomUnique(1, 25);
const generatePhotoId = createRandomUnique(1, 25);
const generateCommentId = createRandomUnique(1, 10000);

const createPublication = () => ({
  id: generatePostId(),
  url: `photos/${generatePhotoId()}.jpg`,
  description: 'Описание фотографии',
  likes: getRandomInteger(15, 200),
  comments: [
    {id: generateCommentId()},
    {avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`},
    {message: getRandomArrayElement(MESSAGES)},
    {name: 'Пользователь'},
  ]
});

const similarPublication = Array.from({length: SIMILAR_PUBLICATION_COUNT}, createPublication);

console.log (similarPublication); // eslint-disable-line no-console
