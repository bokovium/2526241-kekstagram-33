import { createSocialComment } from './create-social-comment.js';

const COMMENTS_STEP = 5;
const bigPicture = document.querySelector('.big-picture');
const buttonClose = document.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const picturesLikesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.social__comment-total-count');
const shownCount = document.querySelector('.social__comment-shown-count');
const socialDesc = document.querySelector('.social__caption');
const socialCommentsList = document.querySelector('.social__comments');
const commentLoaderButton = document.querySelector('.comments-loader');
let commentLoaded = [];
let commentsCounter = COMMENTS_STEP;

//Очистка комментариев
const clearComments = () => {
  socialCommentsList.innerHTML = '';
};

// Рендеринг комментариев
const renderComments = (commentsList) => {
  clearComments();
  commentLoaded = commentsList.slice(0, commentsCounter);

  const commentListFragment = document.createDocumentFragment();
  commentLoaded.forEach((comment) => {
    commentListFragment.appendChild(createSocialComment(comment));
  });

  socialCommentsList.appendChild(commentListFragment);
  shownCount.textContent = commentLoaded.length;

  if (commentLoaded.length >= commentsList.length) {
    commentLoaderButton.classList.add('hidden');
  } else {
    commentLoaderButton.classList.remove('hidden');
  }
};

// Заведение кнопки "Загрузить ещё"
const onLoadMoreComments = (commentsList) => {
  commentsCounter += COMMENTS_STEP;
  renderComments(commentsList);
};

// Открытие модального окна
const openBigPicture = (photo) => {
  bigPictureImg.src = photo.url;
  picturesLikesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialDesc.textContent = photo.description;

  commentsCounter = COMMENTS_STEP;
  renderComments(photo.comments);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Обработчик кнопки загрузки комментариев
  commentLoaderButton.onclick = () => onLoadMoreComments(photo.comments);
};

// Закрытие модального окна
export const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscClose);
};

// Обработчик закрытия через Escape - сделано таким образом во избежание ошибки о раннем использовании onEscClose
function onEscClose (evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

// Установка событий на миниатюры и делегирование
export const setupMiniatures = (photos) => {
  const container = document.querySelector('.pictures');


  container.addEventListener('click', (evt) => {
    const picture = evt.target.closest('.picture');
    if (picture) {
      const clickedItemId = Number(picture.dataset.id);
      const photo = photos.find((item) => item.id === clickedItemId);
      if (photo) {
        openBigPicture(photo);
        document.addEventListener('keydown', onEscClose);
      }
    }
  });

  buttonClose.addEventListener('click', closeBigPicture);
};
