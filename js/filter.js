import { renderPictures } from './pictures.js';
import { dataPhotos } from './load.js';

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

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
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
  changeClassDefault();
  resetPictures();

  renderPictures(dataPhotos);
}

function onButtonRandomClick() {
  changeClassRandom();
  resetPictures();

  let newArray = dataPhotos.slice();
  newArray = shuffle(newArray);
  renderPictures(newArray.slice(0, 10));
}

function onButtonDiscussedClick() {
  changeClassDiscussed();
  resetPictures();

  const newArray = dataPhotos.slice();
  newArray.sort((a, b) => b.comments.length - a.comments.length);
  renderPictures(newArray);
}

buttonDefault.addEventListener('click', debounce(onButtonDefaultClick));
buttonRandom.addEventListener('click', debounce(onButtonRandomClick));
buttonDiscussed.addEventListener('click', debounce(onButtonDiscussedClick));
