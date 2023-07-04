const cardTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const container = document.querySelector('.pictures');

const fragment = document.createDocumentFragment();

const fillCardTemplate = ({id, url, description, likes, comments}) => {
  const temp = cardTemplate.cloneNode(true);

  temp.dataset.id = id;
  temp.querySelector('.picture__img').src = url;
  temp.querySelector('.picture__img').alt = description;
  temp.querySelector('.picture__likes').textContent = likes;
  temp.querySelector('.picture__comments').textContent = comments.length;

  return temp;
};

export const renderThumbnails = (data) => {
  data.forEach((cardObj) => {
    fragment.appendChild(fillCardTemplate(cardObj));
  });
  container.appendChild(fragment);
};
