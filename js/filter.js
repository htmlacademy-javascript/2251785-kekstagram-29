import { renderPictures } from './pictures.js';
import { dataPhotos } from './load.js';
import { shuffle, debounce } from './utils.js';

const filter = document.querySelector('.img-filters');
const filterDefault = filter.querySelector('#filter-default');
const filterRandom = filter.querySelector('#filter-random');
const filterDiscussed = filter.querySelector('#filter-discussed');

const picturesContainer = document.querySelector('section.pictures');

const resetPictures = () => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.remove();
  });
};

const removeClassButton = (btn) => btn.classList.remove('img-filters__button--active');

const onDefaultChange = () => {
  removeClassButton(filterRandom);
  removeClassButton(filterDiscussed);
  filterDefault.classList.add('img-filters__button--active');
};

const onRandomChange = () => {
  removeClassButton(filterDefault);
  removeClassButton(filterDiscussed);
  filterRandom.classList.add('img-filters__button--active');
};

const onDiscussedChange = () => {
  removeClassButton(filterDefault);
  removeClassButton(filterRandom);
  filterDiscussed.classList.add('img-filters__button--active');
};

const onButtonDefaultClick = () => {
  resetPictures();
  renderPictures(dataPhotos);
};

const onButtonRandomClick = () => {
  resetPictures();
  let newArray = dataPhotos.slice();
  newArray = shuffle(newArray);
  renderPictures(newArray.slice(0, 10));
};

const onButtonDiscussedClick = () => {
  resetPictures();
  const newArray = dataPhotos.slice();
  newArray.sort((a, b) => b.comments.length - a.comments.length);
  renderPictures(newArray);
};

filterDefault.addEventListener('click', debounce(onButtonDefaultClick));
filterRandom.addEventListener('click', debounce(onButtonRandomClick));
filterDiscussed.addEventListener('click', debounce(onButtonDiscussedClick));

export { onDefaultChange, onRandomChange, onDiscussedChange };
