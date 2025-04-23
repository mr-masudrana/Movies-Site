document.getElementById('uploadMovies').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const year = document.getElementById('year').value.trim();
  const category = document.getElementById('category').value.trim();
  const posterurl = document.getElementById('posterurl').value.trim();
  const driveid = document.getElementById('driveid').value.trim();

  const data = {
    title,
    year,
    category,
    posterurl,
    driveid
  };

  fetch('https://script.google.com/macros/s/AKfycbxPjYT60yT9iOskWpMod8nt7QuoTbWL3kT3VP4jajxz3honsTLg29Isaj9noif4L3yi/exec', {
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
