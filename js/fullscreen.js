import {thumbnailsData} from './gallery.js';

const thumbnails = document.querySelectorAll('.picture');

const modalPicture = document.querySelector('.big-picture');
const buttonExit = document.querySelector('.big-picture__cancel');

const commentsCount = document.querySelector('.social__comment-count');
const buttonComments = document.querySelector('.comments-loader');

const picture = document.querySelector('.big-picture__img img');
const likes = document.querySelector('.likes-count');
const comments = document.querySelector('.comments-count');
const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const socialCaption = document.querySelector('.social__caption');

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener('click', () => {
    // console.log(thumbnail);
    modalPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    dataThumbnails(thumbnail);
  });
});

// ~~(j / 5) === 1 && j !== 0

function dataThumbnails(thumbnail) {
  for (let i = 0; i < thumbnailsData.length; i++) {
    if (thumbnail.dataset.id === thumbnailsData[i].id.toString()) {
      picture.src = thumbnailsData[i].url;
      likes.textContent = thumbnailsData[i].likes;
      comments.textContent = thumbnailsData[i].comments.length;
      socialCaption.textContent = thumbnailsData[i].description;

      //dataComments
      socialComments.replaceChildren();
      for (let j = 0; j < thumbnailsData[i].comments.length; j++) {
        const temp = socialComment.cloneNode(true);
        temp.querySelector('.social__picture').src = thumbnailsData[i].comments[j].avatar;
        temp.querySelector('.social__picture').alt = thumbnailsData[i].comments[j].name;
        temp.querySelector('.social__text').textContent = thumbnailsData[i].comments[j].message;

        if (j >= 5) {
          temp.classList.add('hidden');
          socialComments.appendChild(temp);
        } else {
          socialComments.appendChild(temp);
        }
      }
      break;
    }
  }
}

buttonComments.addEventListener('click', () => {
  const hiddenComments = socialComments.querySelectorAll('.hidden');
  for (let i = 0; i < 5; i++) {
    hiddenComments[0].classList.remove('.hidden');
  }
});

const modalClose = () => {
  modalPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

buttonExit.addEventListener('click', () => {
  modalClose();
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    modalClose();
  }
});
