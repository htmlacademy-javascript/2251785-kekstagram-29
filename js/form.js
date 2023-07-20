import { isEscapeKey } from './utils.js';
import { resetDefault } from './photo-editor.js';
import { messageCreate, messageOpen } from './message-status.js';
import { sendData } from './api.js';

const body = document.querySelector('body');

const form = document.querySelector('.img-upload__form');

const hastags = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');

const photoButton = document.querySelector('.img-upload__input');
const newPhoto = document.querySelector('.img-upload__overlay');

const buttonClose = document.querySelector('.img-upload__cancel');
const buttonSubmit = document.querySelector('.img-upload__submit');

const hashtagValidate = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text__hashtags-error'
}, false);

const onDocumentKeydown = (evt) => {
  const messageError = body.querySelector('.error.hidden');
  if (isEscapeKey(evt) && (document.activeElement !== hastags && document.activeElement !== description) && messageError !== null) {
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
  resetDefault();
  photoButton.value = '';

  newPhoto.classList.add('hidden');
  body.classList.remove('modal-open');

  pristine.reset();

  document.removeEventListener('keydown', onDocumentKeydown);
  buttonClose.removeEventListener('click', onFormCloseClick);
}

function blockButtonSubmit() {
  buttonSubmit.disabled = true;
}

function unblockButtonSubmit() {
  buttonSubmit.disabled = false;
}

photoButton.addEventListener('change', formOpen);

function validateHashtag (value) {
  let valid = true;
  if (value !== '') {
    const arrayHashtags = value.trim().split(' ');
    arrayHashtags.forEach((hashtag) => {
      if (!hashtagValidate.test(hashtag)) {
        valid = false;
      }
    });
  }
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

pristine.addValidator(hastags, validateHashtag, 'Введён невалидный хэш-тег');

pristine.addValidator(hastags, countHashtag, 'Превышено количество хэш-тегов');

pristine.addValidator(hastags, uniqueHashtag, 'Хэш-теги повторяются');

messageCreate('success');
messageCreate('error');
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockButtonSubmit();
    const formData = new FormData(form);
    sendData(formData)
      .then(() => messageOpen('success'))
      .catch(() => messageOpen('error'))
      .finally(unblockButtonSubmit);
  }
});

export { formClose };
