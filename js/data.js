import {getRandomInteger, createRandomUnique, getRandomArrayElement} from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const generatePostId = createRandomUnique(1, 25);
const generatePhotoId = createRandomUnique(1, 25);
const generateCommentId = createRandomUnique(1, 10000);

const randomComments = () => {
  const randomQuantity = getRandomInteger(0, 30);
  const comments = [];
  for (let i = 0; i < randomQuantity; i++) {
    const comment = {
      id: generateCommentId(),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: 'Пользователь',
    };
    comments.push(comment);
  }

  return comments;
};

const createPublication = () => ({
  id: generatePostId(),
  url: `photos/${generatePhotoId()}.jpg`,
  description: 'Описание фотографии',
  likes: getRandomInteger(15, 200),
  comments: randomComments(),
});

const publicationsData = (param) => Array.from({length: param}, createPublication);

export {publicationsData};
