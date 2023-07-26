import { renderPictures } from './pictures.js';
import { getData } from './api.js';
import { onDefaultChange, onRandomChange, onDiscussedChange } from './filter.js';

const filter = document.querySelector('.img-filters');
const filterDefault = filter.querySelector('#filter-default');
const filterRandom = filter.querySelector('#filter-random');
const filterDiscussed = filter.querySelector('#filter-discussed');

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

filterDefault.addEventListener('click', onDefaultChange);
filterRandom.addEventListener('click', onRandomChange);
filterDiscussed.addEventListener('click', onDiscussedChange);

export { dataPhotos };
