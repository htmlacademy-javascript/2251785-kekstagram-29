import { renderPictures } from './pictures.js';
import { getData } from './api.js';

let dataPhotos = null;

getData()
  .then((data) => {
    dataPhotos = data;
  })
  .then(() => {
    renderPictures(dataPhotos);
  })
  // eslint-disable-next-line no-alert
  .catch(() => alert('Не удалось загрузить данные. Попробуйте обновить страницу'));

export { dataPhotos };
