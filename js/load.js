import { renderPictures } from './pictures.js';
import { getData } from './api.js';

const filter = document.querySelector('.img-filters');

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

export { dataPhotos };
