import { isEscapeKey } from './utils.js';

const form = document.querySelector('.img-upload__form');
const input = form.querySelector('input');
const hastags = form.querySelector('.text__hashtags');
const photoButton = document.querySelector('.img-upload__input');
const newPhoto = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const buttonClose = document.querySelector('.img-upload__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && document.activeElement === input) {
    evt.preventDefault();
    formClose();
  }
};

const onFormCloseClick = () => {
  formClose();
};

function formOpen () {
  newPhoto.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  buttonClose.addEventListener('click', onFormCloseClick);
}

function formClose () {
  form.reset();

  newPhoto.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  buttonClose.removeEventListener('click', onFormCloseClick);
}

photoButton.addEventListener('change', formOpen);

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text__hashtags-error'
}, false);

function validateHashtag (value) {
  const arrayHashtags = value.trim().split(' ');
  const hashtagValidate = /^#[a-zа-яё0-9]{1,19}$/i;
  let valid = true;
  arrayHashtags.forEach((hashtag) => {
    if (!hashtagValidate.test(hashtag)) {
      valid = false;
    }
  });
  return valid;
}

function countHashtag (value) {
  const arrayHashtags = value.trim().split(' ');
  return arrayHashtags.length <= 5;
}

function uniqueHashtag (value) {
  const arrayHashtags = value.trim().split(' ');
  return (new Set(arrayHashtags)).size === arrayHashtags.length;
}

pristine.addValidator(
  hastags,
  validateHashtag,
  'Введён невалидный хэш-тег'
);

pristine.addValidator(
  hastags,
  countHashtag,
  'Превышено количество хэш-тегов'
);

pristine.addValidator(
  hastags,
  uniqueHashtag,
  'Хэш-теги повторяются'
);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
