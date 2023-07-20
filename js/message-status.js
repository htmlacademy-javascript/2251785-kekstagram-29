import { isEscapeKey } from './utils.js';
import { formClose } from './form.js';
import { resetDefault } from './photo-editor.js';

const body = document.querySelector('body');

function messageCreate(status) {
  const messageElement = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
  const messageClone = messageElement.cloneNode(true);
  body.appendChild(messageClone);

  const message = body.querySelector(`.${status}`);
  message.classList.add('hidden');
}

function messageOpen(status) {
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
    message.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    message.querySelector(`.${status}__button`).removeEventListener('click', onMessageCloseClick);
    message.removeEventListener('click', onModalCloseClick);
    if (status === 'success') {
      resetDefault();
      formClose();
    }
  }
}

export { messageCreate, messageOpen };
