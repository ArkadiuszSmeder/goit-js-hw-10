import axios from 'axios';

export const fetchBreeds = () => {
  axios.defaults.headers.common['x-api-key'] =
    'live_1QhRqD5kpOJUtdhSXHK6FAPECi5qvimnbuD8zS8rBlqmkJsWDHV365qJ6IJL1GPz';

  return axios.get(`https://api.thecatapi.com/v1/breeds`).then(res => res.data); // w tej linijce zwracamy obietnicę z tablicą ras 
};

export const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`) 
    .then(res => res.data);
};

//fetchCatByBreed(breedId), która oczekuje identyfikatora rasy, wykonuje żądanie HTTP i zwraca obietnicę z danymi o kocie - 
//wynikiem żądania. Umieść ją w pliku cat-api.js i dokonaj nazwanego eksportu.