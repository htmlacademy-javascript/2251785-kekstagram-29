const cardTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const container = document.querySelector('.pictures');

const fragment = document.createDocumentFragment();

const fillCardTemplate = (photoObj) => {
  const temp = cardTemplate.cloneNode(true);

  temp.querySelector('.picture__img').src = photoObj.url;
  temp.querySelector('.picture__img').alt = photoObj.description;
  cardTemplate.querySelector('.picture__likes').textContent = photoObj.likes;
  cardTemplate.querySelector('.picture__comments').textContent = photoObj.comments.length;

  return temp;
};

export const renderPictures = (data) => {
  data.forEach((cardObj) => {
    fragment.appendChild(fillCardTemplate(cardObj));
  });
  container.appendChild(fragment);
};
