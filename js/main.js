import {getRandomInteger, createRandomUnique, getRandomArrayElement} from './util.js';
import {MESSAGES, SIMILAR_PUBLICATION_COUNT} from './data.js';

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

const similarPublication = Array.from({length: SIMILAR_PUBLICATION_COUNT}, createPublication);

console.log (similarPublication); // eslint-disable-line no-console
