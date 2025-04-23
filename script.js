let currentPage = 1;
const itemsPerPage = 8;

const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");

function init() {
  Tabletop.init({
    key: "1GThaLoNUn4dj0a-zSsTIoX97eFiAcUR9swu85n-X0uk", // replace this
    simpleSheet: true,
    callback: function (data) {
      window.movies = data;
      renderCategories(data);
      renderMovies(data);
      setupFilters(data);
    }
  });
}

document.addEventListener("DOMContentLoaded", init);

function renderMovies(filteredMovies) {
  movieGrid.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginated = filteredMovies.slice(start, end);

  paginated.forEach(movie => {
    const col = document.createElement("div");
    col.className = "col-md-3 mb-4";
    col.innerHTML = `
      <div class="card h-100 shadow-sm position-relative">
        <img src="${movie["Poster URL"]}" class="card-img-top" alt="${movie.Title}">
        <div class="card-body">
          <h5 class="card-title">${movie.Title}</h5>
          <p class="card-text">${movie.Year} - ${movie.Genre}</p>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#movieModal" onclick="openMovieModal('${movie["Drive ID"]}', '${movie.Title}')">Watch</button>
        </div>
      </div>
    `;
    movieGrid.appendChild(col);
  });

  renderPagination(filteredMovies.length);
}

function setupFilters(data) {
  const genreFilter = document.getElementById("genreFilter");
  const yearFilter = document.getElementById("yearFilter");

  const genres = [...new Set(data.map(m => m.Genre))];
  genres.forEach(g => {
    const opt = document.createElement("option");
    opt.value = g;
    opt.textContent = g;
    genreFilter.appendChild(opt);
  });

  const years = [...new Set(data.map(m => m.Year))];
  years.forEach(y => {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    yearFilter.appendChild(opt);
  });

  genreFilter.addEventListener("change", () => {
    currentPage = 1;
    applyFilters(data);
  });
  yearFilter.addEventListener("change", () => {
    currentPage = 1;
    applyFilters(data);
  });
  searchInput.addEventListener("input", () => {
    currentPage = 1;
    applyFilters(data);
  });
}

function applyFilters(data) {
  const genre = document.getElementById("genreFilter").value;
  const year = document.getElementById("yearFilter").value;
  const query = searchInput.value.toLowerCase();

  const filtered = data.filter(movie =>
    (!genre || movie.Genre === genre) &&
    (!year || movie.Year === year) &&
    movie.Title.toLowerCase().includes(query)
  );

  renderMovies(filtered);
}

function renderCategories(data) {
  const categories = [...new Set(data.map(movie => movie.Genre))];
  const categoryFilter = document.getElementById("categoryFilter");

  categories.forEach(category => {
    const listItem = document.createElement("a");
    listItem.className = "list-group-item list-group-item-action";
    listItem.href = "#";
    listItem.textContent = category;
    listItem.addEventListener("click", () => {
      document.getElementById("genreFilter").value = category;
      currentPage = 1;
      applyFilters(data);
    });
    categoryFilter.appendChild(listItem);
  });
}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagination = document.getElementById("paginationControls");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPage ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      applyFilters(window.movies);
    });
    pagination.appendChild(li);
  }
}

function openMovieModal(driveId, title) {
  document.getElementById("movieIframe").src = `https://drive.google.com/file/d/${driveId}/preview`;
  document.getElementById("downloadLink").href = `https://drive.google.com/uc?export=download&id=${driveId}`;
  document.getElementById("movieModalLabel").textContent = title;
}