import { renderPictures } from './pictures.js';
import { dataPhotos } from './load.js';
import { shuffle, debounce } from './utils.js';

const filter = document.querySelector('.img-filters');
const buttonDefault = filter.querySelector('#filter-default');
const buttonRandom = filter.querySelector('#filter-random');
const buttonDiscussed = filter.querySelector('#filter-discussed');

const picturesContainer = document.querySelector('section.pictures');

function resetPictures() {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.remove();
  });
}

const removeClassButton = (btn) => btn.classList.remove('img-filters__button--active');

const changeClassDefault = () => {
  removeClassButton(buttonRandom);
  removeClassButton(buttonDiscussed);
  buttonDefault.classList.add('img-filters__button--active');
};

const changeClassRandom = () => {
  removeClassButton(buttonDefault);
  removeClassButton(buttonDiscussed);
  buttonRandom.classList.add('img-filters__button--active');
};

const changeClassDiscussed = () => {
  removeClassButton(buttonDefault);
  removeClassButton(buttonRandom);
  buttonDiscussed.classList.add('img-filters__button--active');
};

function onButtonDefaultClick() {
  resetPictures();
  renderPictures(dataPhotos);
}

function onButtonRandomClick() {
  resetPictures();
  let newArray = dataPhotos.slice();
  newArray = shuffle(newArray);
  renderPictures(newArray.slice(0, 10));
}

function onButtonDiscussedClick() {
  resetPictures();
  const newArray = dataPhotos.slice();
  newArray.sort((a, b) => b.comments.length - a.comments.length);
  renderPictures(newArray);
}

buttonDefault.addEventListener('click', debounce(onButtonDefaultClick));
buttonRandom.addEventListener('click', debounce(onButtonRandomClick));
buttonDiscussed.addEventListener('click', debounce(onButtonDiscussedClick));

export { changeClassDefault, changeClassRandom, changeClassDiscussed };
