import { renderPictures } from './pictures.js';
import { getData } from './api.js';
import { changeClassDefault, changeClassRandom, changeClassDiscussed } from './filter.js';

const filter = document.querySelector('.img-filters');
const buttonDefault = filter.querySelector('#filter-default');
const buttonRandom = filter.querySelector('#filter-random');
const buttonDiscussed = filter.querySelector('#filter-discussed');

let dataPhotos = null;

getData()
  .then((data) => {
    dataPhotos = data;
  })
  .then(() => {
    renderPictures(dataPhotos);
    filter.classList.remove('img-filters--inactive');
  })
  // eslint-disable-next-line no-alert
  .catch(() => alert('Не удалось загрузить данные. Попробуйте обновить страницу'));

buttonDefault.addEventListener('click', changeClassDefault);
buttonRandom.addEventListener('click', changeClassRandom);
buttonDiscussed.addEventListener('click', changeClassDiscussed);

export { dataPhotos };
