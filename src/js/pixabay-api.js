export function getPhoto(value) {
  const BASE_URL = 'https://pixabay.com/api/?';
  const params = '&image_type=photo&orientation=horizontal&safesearch=true';
  const END_POINT = 'key=43022470-1213c485ef19c9845e2639418';
  const url = `${BASE_URL}${END_POINT}&q=${value}${params}`;
  return fetch(url).then(res => res.json());
}
