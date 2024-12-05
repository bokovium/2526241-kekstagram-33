const FILE_TYPES = ['jpg', 'jpeg', 'png'];
export const imageUploadInput = document.querySelector('.img-upload__input');

export const effectsPreviews = document.querySelectorAll('.effects__preview');

import { imgUploadPreview } from './scale-photo.js';

imageUploadInput.addEventListener('change', () => {
  const file = imageUploadInput.files[0];
  const fileUrl = URL.createObjectURL(file);
  const fileName = file.name.toLowerCase();
  const isMatches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (isMatches) {
    imgUploadPreview.src = fileUrl;
    effectsPreviews.forEach((effectsPreview) => {
      effectsPreview.style.backgroundImage = `url("${fileUrl}")`;
    });
  }
});
