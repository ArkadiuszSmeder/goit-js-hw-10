import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css'

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorParagraph = document.querySelector('.error');
try {
  loader.classList.remove('hidden');
  hideError();
  fetchBreeds()
  .then(data => renderSelect(data));
} catch (error) {
  console.log(error);
}

function renderSelect(breeds) {
  const markup = breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', markup);
  loader.classList.add('hidden');

  //new SlimSelect('.breed-select', {
    //placeholder: 'Choose your favorite kitty 😺'
  //});

  new SlimSelect({
    select: '#selectElement',
    settings: {
      placeholderText: 'Choise your favorite kitty 😺',
      showSearch: false
    },
  });
}


breedSelect.addEventListener('change', e => {
  loader.classList.remove('hidden');
  catInfo.innerHTML = '';
  hideError();
  fetchCatByBreed(e.target.value)
    .then(data => renderCat(data[0]))
    .catch(error => {
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', error);
      showError();
      loader.classList.add('hidden');
      errorParagraph.classList.add('hidden');
    });
});

function renderCat(catData) {
  const { url } = catData;
  const { description, name, temperament } = catData.breeds[0];
  catInfo.insertAdjacentHTML(
    'beforeend',
    `<div class="cat-container">
      <img src="${url}" alt="${name}" />
      <div class="cat-info">
        <h2>${name}</h2>
        <p>${description}</p>
        <p><strong>Temperament:</strong> ${temperament}</p>
      </div>
    </div>`
  );
  loader.classList.add('hidden');
}

function showError() {
  errorParagraph.classList.remove('hidden'); 
}

function hideError() {
  errorParagraph.classList.add('hidden');
}