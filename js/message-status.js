import { isEscapeKey } from './utils.js';
import { formClose } from './form.js';

const body = document.querySelector('body');

function messageCreate(status) {
  const messageElement = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
  const messageClone = messageElement.cloneNode(true);
  body.appendChild(messageClone);

  const message = body.querySelector(`.${status}`);
  message.classList.add('hidden');
}

function messageDelete(status) {
  const message = body.querySelector(`.${status}`);
  message.remove();
}

function messageOpen(status) {
  if (status === 'success') {
    formClose();
  }
  messageCreate(status);
  const modal = body.querySelector(`.${status}__inner`);
  const message = body.querySelector(`.${status}`);
  message.classList.remove('hidden');

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      messageClose();
    }
  };

  const onMessageCloseClick = () => {
    messageClose();
  };

  const onModalCloseClick = (e) => {
    const click = e.composedPath().includes(modal);
    if (!click) {
      messageClose();
    }
  };

  document.addEventListener('keydown', onDocumentKeydown);
  message.querySelector(`.${status}__button`).addEventListener('click', onMessageCloseClick);
  message.addEventListener('click', onModalCloseClick);

  function messageClose () {
    messageDelete(status);
    document.removeEventListener('keydown', onDocumentKeydown);
    message.querySelector(`.${status}__button`).removeEventListener('click', onMessageCloseClick);
    message.removeEventListener('click', onModalCloseClick);
  }
}

export { messageOpen };
