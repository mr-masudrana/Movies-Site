let allMovies = {};
const loadIndexes = {};
const languages = ["Latest", "Bangla", "English", "Hindi", "South"];

// Initialize loadIndexes
languages.forEach(lang => loadIndexes[lang] = 4);

// Group movies by language
function groupMoviesByLanguage(data) {
  const grouped = {};
  data.forEach(movie => {
    const lang = movie.language;
    if (!grouped[lang]) grouped[lang] = [];
    grouped[lang].push(movie);
  });
  return grouped;
}

// Render movies
function renderMovies(lang, count, list = null) {
  const movies = list || allMovies[lang] || [];
  const container = document.getElementById("row-" + lang);
  if (!container) return;
  container.innerHTML = "";

  movies.slice(0, count).forEach(movie => {
    container.innerHTML += `
      <div class="col-6 col-sm-4 col-md-3 mb-4" data-aos="fade-up">
        <div class="card h-100">
          <img src="${movie.poster}" class="card-img-top" loading="lazy">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <a href="movie.html?id=${movie.id}" class="btn btn-primary btn-sm">Watch Now</a>
          </div>
        </div>
      </div>
    `;
  });
}

// Fetch movies.json and initialize
fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRqfbH89ZaOcHAOw_BdxpWEH442X85uMKK82Go-FHFCSwvinJBAkLcAWkiib3ENcxszCa5m_5gFzBe5/pub?output=csv')
  .then(res => res.text())
  .then(csv => {
    const rows = csv.split('\n').slice(1); // skip header
    const data = rows.map(row => {
      const cols = row.split(',');
      return {
        id: cols[0],
        title: cols[1],
        year: cols[2],
        category: cols[3],
        language: cols[4],
        poster: cols[5],
        videoLink: cols[6],
        description: cols[7]
      };
    }
  );

    const latestMovies = data.slice().reverse().slice(0, 8);
    const grouped = groupMoviesByLanguage(data);
    grouped["Latest"] = latestMovies;
    allMovies = grouped;
    Object.keys(allMovies).forEach(lang => renderMovies(lang, loadIndexes[lang]));
  });

// Dark Mode Switch Toggle
const darkModeSwitch = document.getElementById('darkModeSwitch');
darkModeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', darkModeSwitch.checked);
});

// Remember user's preference in localStorage
if (localStorage.getItem('darkMode') === 'true') {
  darkModeSwitch.checked = true;
  document.body.classList.add('dark-mode');
}

darkModeSwitch.addEventListener('change', () => {
  localStorage.setItem('darkMode', darkModeSwitch.checked);
});

// Search
document.getElementById('searchInput').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  if (!query) {
    Object.keys(allMovies).forEach(lang => renderMovies(lang, loadIndexes[lang]));
    return;
  }
  Object.keys(allMovies).forEach(lang => {
    const filtered = allMovies[lang].filter(movie => movie.title.toLowerCase().includes(query));
    renderMovies(lang, filtered.length, filtered);
  });
});

document.getElementById('clearSearch').addEventListener('click', () => {
  document.getElementById('searchInput').value = '';
  Object.keys(allMovies).forEach(lang => renderMovies(lang, loadIndexes[lang]));
});

// Back to Top
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Load More
function handleLoadMore(lang) {
  loadIndexes[lang] += 4;
  renderMovies(lang, loadIndexes[lang]);
}

// After movies are rendered
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('load-more')) {
    const lang = e.target.dataset.lang;
    handleLoadMore(lang);
  }
});
