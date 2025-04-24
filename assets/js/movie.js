const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Google Sheets CSV URL
const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRqfbH89ZaOcHAOw_BdxpWEH442X85uMKK82Go-FHFCSwvinJBAkLcAWkiib3ENcxszCa5m_5gFzBe5/pub?output=csv";

// Convert CSV to JSON
function csvToJson(csv) {
  const lines = csv.split("\n");
  const headers = lines[0].split(",");
  return lines.slice(1).map(line => {
    const values = line.split(",");
    const obj = {};
    headers.forEach((header, i) => {
      obj[header.trim()] = values[i]?.trim() || "";
    });
    return obj;
  });
}

// Fetch data and show movie
fetch(csvUrl)
  .then(res => res.text())
  .then(csv => {
    const movies = csvToJson(csv);
    const movie = movies.find(m => m.id === movieId);
    const container = document.getElementById('movieContainer');

    if (movie) {
      container.innerHTML = `
        <h2 class="mb-3">${movie.title}</h2>
        <p>${movie.description}</p>
        <div class="ratio ratio-16x9 mb-4">
          <iframe src="${movie.videoLink}" allowfullscreen loading="lazy"></iframe>
        </div>
        <a href="${movie.videoLink.replace('/preview', '')}" class="btn btn-success" target="_blank">Download</a>
      `;
    } else {
      container.innerHTML = '<p>Movie not found.</p>';
    }
  });

// Dark Mode
const darkSwitch = document.getElementById('darkModeSwitch');
darkSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', darkSwitch.checked);
  localStorage.setItem('darkMode', darkSwitch.checked);
});
if (localStorage.getItem('darkMode') === 'true') {
  darkSwitch.checked = true;
  document.body.classList.add('dark-mode');
}