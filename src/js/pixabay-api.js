export function getPhoto(value) {
  const BASE_URL = 'https://pixabay.com/api/?';
  const params = new URLSearchParams({
    key: '43022470-1213c485ef19c9845e2639418',
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const url = `${BASE_URL}${params}`;

  return fetch(url).then(res => res.json());
}
