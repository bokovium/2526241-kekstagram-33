document.querySelector('.img-upload__overlay').classList.remove('hidden');

const HASHTAG_MAX_LENGTH = 19;
const HASHTAG_MAX_QUANT = 5;
const HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const COMMENT_MAX_LENGTH = 140;
const SHOWN_MESSAGES = {
  hashtagRule: `Хэштег должен начинаться с #, далее буквы и числа, но не более ${HASHTAG_MAX_LENGTH}`,
  maxQuantRule: `Максимальное количество хэштегов - ${HASHTAG_MAX_QUANT}`,
  noRepeatRule: 'Хэштеги не должны повторяться',
  maxLengthComment: `Максимальная длина комментария ${COMMENT_MAX_LENGTH} символов`
};

const uploadFormElement = document.querySelector('#upload-select-image');
const hashtagInputElement = uploadFormElement.querySelector('[name = "hashtags"]');
const commentInputElement = uploadFormElement.querySelector('[name="description"]');

const validator = new Pristine (uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const checkLength = (input, maxLength) => input.length <= maxLength;

const parseHashtags = (inputValue) =>
  inputValue
    .trim() //удаление пробелов с двух сторон строки
    .split(' ') //разделение хэштегов по пробелам
    .filter(Boolean); //наличие какого-либо значения

const checkHashtag = (text) => {
  const hashtags = parseHashtags(text);
  return hashtags.every((hashtag) =>HASHTAG_SYMBOLS.test(hashtag));
};

const checkHashtagMaxQuant = (text) => {
  const hashtags = parseHashtags(text);
  return checkLength(hashtags,HASHTAG_MAX_QUANT);
};

const checkRepeats = (array) => {
  const uniqueItems = new Set(array.map((item) => item.toUpperCase())); //приведение хэштегов к верхнему регистру
  return uniqueItems.size === array.length; //проверка количества полученных хэштегов и длины исходного массива, при несовпадении, возвращает false
};

const checkHashtagRepeats = (text) => {
  const hashtags = parseHashtags(text);
  return checkRepeats(hashtags);
};

const checkCommentMaxLength = (text) => checkLength(text, COMMENT_MAX_LENGTH);

const validation = () => {
  validator.addValidator(hashtagInputElement, checkHashtag, SHOWN_MESSAGES.hashtagRule);
  validator.addValidator(hashtagInputElement, checkHashtagMaxQuant, SHOWN_MESSAGES.maxQuantRule);
  validator.addValidator(hashtagInputElement, checkHashtagRepeats, SHOWN_MESSAGES.noRepeatRule);
  validator.addValidator(commentInputElement, checkCommentMaxLength, SHOWN_MESSAGES.maxLengthComment);
};

validation();

uploadFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  validator.validate();
});
