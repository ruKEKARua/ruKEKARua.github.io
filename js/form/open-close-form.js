import { isEscapeKey } from '../util.js';
import { fillPhotos } from './fill-photos.js';
import { deletePhotos } from './delete-photos.js';
import { getScalePhoto } from '../filter-photo/scale-photo.js';
import { changeFilter } from '../filter-photo/change-filter.js';

const body = document.querySelector('body');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadControl = document.querySelector('.img-upload__input');
const uploadCloseButton = uploadOverlay.querySelector('.img-upload__cancel');
const photoPreview = document.querySelector('.img-upload__preview').querySelector('img');


const onCloseButtonClick = () => {
  uploadOverlay.classList.add('hidden');
  deletePhotos(); // возвращаем все фото обратно на заглушки
  photoPreview.style = '';
  body.classList.remove('modal-open');
  uploadCloseButton.removeEventListener('click', onCloseButtonClick);
};

const onEscapeKeydown = (evt) => {
  const postError = document.querySelector('.error');
  if (isEscapeKey(evt) && !postError) {
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    deletePhotos(); // возвращаем все фото обратно на заглушки
    photoPreview.style = '';
    uploadCloseButton.removeEventListener('keydown', onEscapeKeydown);
  }
};

const openForm = () => {

  const removeHiddenToForm = (evt) => {
    fillPhotos(evt); // заполняем все шаблоны-превью и основную картинку, выбранной

    // прогружаем скрипты для редактирования фото
    getScalePhoto();
    changeFilter();

    // затем показываем окно формы
    body.classList.add('modal-open');
    uploadOverlay.classList.remove('hidden');
    uploadCloseButton.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onEscapeKeydown);

  };


  uploadControl.addEventListener('change', removeHiddenToForm);

};

export {openForm, onCloseButtonClick};
