document.getElementById('uploadMovies').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const year = document.getElementById('year').value.trim();
  const category = document.getElementById('category').value.trim();
  const language = document.getElementById('language').value.trim();
  const posterurl = document.getElementById('posterurl').value.trim();
  const driveid = document.getElementById('driveid').value.trim();
  const description = document.getElementById('description').value.trim();

  const data = {
    title,
    year,
    category,
    language,
    posterurl,
    driveid,
    description
  };

  fetch('https://script.google.com/macros/s/AKfycbxVJi1AIdTfg_980GRnMQOJUE7xQu7lnJU2OyUxQrB6vD4_bEkMYDROSfqVylQDnRpD/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  alert('Movie uploaded successfully!');
  document.getElementById('uploadMovies').reset();
});
