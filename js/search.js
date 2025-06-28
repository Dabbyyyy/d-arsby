document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector('.search-container input[type="text"]');
  const checkboxes = document.querySelectorAll('.search-container input[type="checkbox"]');
  const sortSelect = document.querySelector('.search-container select');
  const resultsContainer = document.querySelector('#results');

  const urlParams = new URLSearchParams(window.location.search);
  const categoryParams = urlParams.getAll('category')
  const sortParam = urlParams.get('sort');

  checkboxes.forEach(cb => {
    if (categoryParams.includes(cb.value)) {
      cb.checked = true;
    }
  });

  if (sortParam) {
    sortSelect.value = sortParam;
  }

  const reviews = 
  [
  { title: "The Shawshank redemption", category: "movie", rating: 8, date: "2025-04-05", image: "../images/m1.png", path: "../movies/review_m1.html" },
  { title: "Doctor Strange", category: "movie", rating: 8, date: "2025-04-18", image: "../images/m2.png", path: "../movies/review_m2.html" },
  { title: "Pulp Fiction", category: "movie", rating: 10, date: "2025-05-01", image: "../images/m3.png", path: "../movies/review_m3.html" },
  { title: "Daoctor Strange: Multiverse of Madness", category: "movie", rating: 5, date: "2025-05-12", image: "../images/m4.png", path: "../movies/review_m4.html" },
  { title: "Django Unchained", category: "movie", rating: 9, date: "2025-04-27", image: "../images/m5.png", path: "../movies/review_m5.html" },

  { title: "Peaky Blinders", category: "tv", rating: 9, date: "2025-04-04", image: "../images/t1.png", path: "../tv/review_t1.html" },
  { title: "T2", category: "tv", rating: 6, date: "2025-04-22", image: "../images/t2.png", path: "../tv/review_t2.html" },
  { title: "Better Call Saul", category: "tv", rating: 10, date: "2025-05-14", image: "../images/t3.png", path: "../tv/review_t3.html" },
  { title: "T4", category: "tv", rating: 3, date: "2025-04-30", image: "../images/t4.png", path: "../tv/review_t4.html" },
  { title: "Breaking Bad", category: "tv", rating: 10, date: "2025-05-11", image: "../images/t5.png", path: "../tv/review_t5.html" },

  { title: "Berserk", category: "book", rating: 10, date: "2025-04-06", image: "../images/b1.png", path: "../books/review_b1.html" },
  { title: "B2", category: "book", rating: 3, date: "2025-04-20", image: "../images/b2.png", path: "../books/review_b2.html" },
  { title: "The Agonist", category: "book", rating: 7, date: "2025-05-16", image: "../images/b3.png", path: "../books/review_b3.html" },
  { title: "Fight Club", category: "book", rating: 10, date: "2025-05-02", image: "../images/b4.png", path: "../books/review_b4.html" },
  { title: "B5", category: "book", rating: 6, date: "2025-04-25", image: "../images/b5.png", path: "../books/review_b5.html" },

  { title: "Dark Souls: Remastered", category: "game", rating: 10, date: "2025-04-02", image: "../images/g1.png", path: "../games/review_g1.html" },
  { title: "Elden Ring: Shadow of the Erdtree", category: "game", rating: 10, date: "2025-04-19", image: "../images/g2.png", path: "../games/review_g2.html" },
  { title: "Phasmophobia", category: "game", rating: 6, date: "2025-05-18", image: "../images/g3.png", path: "../games/review_g3.html" },
  { title: "Sekiro: Shadows Die Twice", category: "game", rating: 9, date: "2025-05-03", image: "../images/g4.png", path: "../games/review_g4.html" },
  { title: "Genshin Impact", category: "game", rating: 9, date: "2025-04-23", image: "../images/g5.png", path: "../games/review_g5.html" },

  { title: "A1", category: "animation", rating: 1, date: "2025-04-03", image: "../images/a1.png", path: "../anim/review_a1.html" },
  { title: "Vinland Saga", category: "animation", rating: 10, date: "2025-04-17", image: "../images/a2.png", path: "../anim/review_a2.html" },
  { title: "Dragon Ball Z: Resurrection 'F'", category: "animation", rating: 6.5, date: "2025-05-17", image: "../images/a3.png", path: "../anim/review_a3.html" },
  { title: "Dragon Ball Kai", category: "animation", rating: 9, date: "2025-05-06", image: "../images/a4.png", path: "../anim/review_a4.html" },
  { title: "Death Note", category: "animation", rating: 9, date: "2025-04-26", image: "../images/a5.png", path: "../anim/review_a5.html" }
  ];

  let filtered = reviews;

  if (categoryParams.length > 0) {
    filtered = filtered.filter(r => categoryParams.includes(r.category));
  }

  if (sortParam === "dateAsc") {
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortParam === "dateDesc") {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortParam === "ratingAsc") {
    filtered.sort((a, b) => a.rating - b.rating);
  } else if (sortParam === "ratingDesc") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  resultsContainer.innerHTML = "";

  if (filtered.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
  } else {
    filtered.forEach(r => {
      const anchor = document.createElement("a");
      anchor.href = r.path;
      anchor.className = "result-poster";

      const img = document.createElement("img");
      img.src = r.image;
      img.alt = r.title;

      const caption = document.createElement("p");
      caption.textContent = `${r.title} (${r.rating})`;

      anchor.appendChild(img);
      anchor.appendChild(caption);
      resultsContainer.appendChild(anchor);
    });
  }

  function applyFilters() {
  let filtered = reviews;

  const selectedCategories = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  if (selectedCategories.length > 0) {
    filtered = filtered.filter(r => selectedCategories.includes(r.category));
  }

  const keyword = searchInput.value.trim().toLowerCase();
  if (keyword) {
    filtered = filtered.filter(r => r.title.toLowerCase().includes(keyword));
  }

  const sortValue = sortSelect.value;

  if (sortValue === "dateAsc") {
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortValue === "dateDesc") {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortValue === "ratingAsc") {
    filtered.sort((a, b) => a.rating - b.rating);
  } else if (sortValue === "ratingDesc") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  resultsContainer.innerHTML = "";

  if (filtered.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
  } else {
    filtered.forEach(r => {
      const anchor = document.createElement("a");
      anchor.href = r.path;
      anchor.className = "result-poster";

      const img = document.createElement("img");
      img.src = r.image;
      img.alt = r.title;

      const caption = document.createElement("p");
      caption.textContent = `${r.title} (${r.rating})`;

      anchor.appendChild(img);
      anchor.appendChild(caption);
      resultsContainer.appendChild(anchor);
    });
  }
}

applyFilters();

checkboxes.forEach(cb => cb.addEventListener("change", applyFilters));
sortSelect.addEventListener("change", applyFilters);
searchInput.addEventListener("input", applyFilters);

});


