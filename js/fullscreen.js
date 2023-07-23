import './pictures.js';
import { isEscapeKey } from './utils.js';
import { dataPhotos } from './load.js';

const COMMENTS_IN_SECTION = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const picturesContainer = document.querySelector('.pictures');
const socialComments = bigPicture.querySelector('.social__comments');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const bodyElement = document.querySelector('body');

let step = 1;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onBigPictureCloseClick = () => {
  closeBigPicture();
};

function openBigPicture() {
  bigPicture.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
}

const onPicturesContainerClick = ({ target }) => {
  if (!target.closest('.picture')) {
    return;
  }
  const cardDataId = target.closest('.picture').dataset.id;
  const photoData = dataPhotos.find((element) => element.id === Number(cardDataId));
  fillBigPicture(photoData);
  openBigPicture();
};

function createComment({avatar, name, message}) {
  return `<li class="social__comment">
    <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
    </li>`;
}

function renderComments(comments) {
  socialComments.innerHTML = comments.map((el) => createComment(el)).join('');
}

function reviewComments(shownComments, allСomments) {
  commentCount.innerHTML = `${shownComments} из ${allСomments} комментариев`;

  if (shownComments === allСomments) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
}

function onCommentsLoaderClick() {
  step = step + 1;
  const comments = JSON.parse(bigPicture.dataset.comments);
  const restComments = comments.slice(0, step * COMMENTS_IN_SECTION);
  renderComments(restComments);
  reviewComments(restComments.length, comments.length);
}

function fillBigPicture({url, description, likes, comments}) {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.dataset.comments = JSON.stringify(comments);

  step = 1;
  const commentsShown = comments.slice(0, COMMENTS_IN_SECTION);

  renderComments(commentsShown);
  reviewComments(commentsShown.length, comments.length);
}

picturesContainer.addEventListener('click', onPicturesContainerClick);
