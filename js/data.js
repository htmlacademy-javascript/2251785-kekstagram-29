import {getRandomInteger, getRandomArrayElement, createIdGenerator} from './utils.js';

// Описание фотографий

const DESCRIPTIONS = [
  'Да, да! В это зеркало я буду фоткаться до тех пор, пока не состарюсь.',
  'Чтобы достичь новых берегов, мы должны плыть, а не дрейфовать.',
  'Икона стиля районного масштаба.',
  'Водка может и не быть ответом, но попробовать стоит.',
  'С прекрасной девушкой приходят большие расходы.',
  'Я иду медленно, но не назад.'
];

// Текст комментариев

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

// Имена авторов

const NAMES = [
  'Ибрагим',
  'Олег',
  'Зинаида',
  'Всеволод',
  'Анджела',
  'Дина'
];

// Необходимое количество сгенерированных объектов

const SIMILAR_PHOTO_COUNT = 25;
const SIMILAR_COMMENT_COUNT = 30;
const AVATAR_MAX_COUNT = 6;
const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;

const generateCommentId = createIdGenerator();

const comment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_MAX_COUNT)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPhotos = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
  comments: Array.from({length: getRandomInteger(0, SIMILAR_COMMENT_COUNT)}, comment)
});

const similarPhotos = () => Array.from({length: SIMILAR_PHOTO_COUNT}, (_, index) => createPhotos(index + 1));

const data = similarPhotos();

export { data };
