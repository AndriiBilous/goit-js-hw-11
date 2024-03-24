// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getPhoto } from './js/pixabay-api';
import { imageTemplates } from './js/render-function';
import { loader } from './js/render-function';
import { error } from './js/render-function';
//========================================================
const imageList = document.querySelector('.image-list');
const form = document.querySelector('.form-search');
form.addEventListener('submit', handlerSubmit);
//========================================================
function handlerSubmit(event) {
  event.preventDefault();

  const inputValue = event.target.elements.search.value.trim(2, 0);

  if (!inputValue) return;

  imageList.innerHTML = '';
  const submitTime = Date.now();

  imageList.insertAdjacentHTML('afterbegin', loader());

  getPhoto(inputValue)
    .then(data => {
      const waitingTime = Date.now() - submitTime;
      setTimeout(() => {
        if (!data.hits.length) {
          imageList.innerHTML = '';
          iziToast.show({
            position: 'topRight',
            color: 'red',
            messageColor: 'black',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
          });
        } else {
          const markup = imageTemplates(data.hits);
          imageList.innerHTML = markup;
          const lightbox = new SimpleLightbox('.image-link', {
            captionsData: 'alt',
            captionDelay: 250,
          });
          lightbox.refresh();
        }
      }, waitingTime);
    })
    .catch(() => {
      imageList.insertAdjacentHTML('afterbegin', error());
    });

  event.target.reset();
}
