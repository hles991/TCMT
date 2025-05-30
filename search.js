let perks = [];

// DOM elements
const input = document.getElementById('search');
const list = document.getElementById('results');
const modeSelect = document.getElementById('modeSelect');
const searchContainer = document.getElementById('searchContainer');

// Render function
function renderList(items) {
  list.innerHTML = items.map(p => {
    const isLarge = p.large;
    return `
      <li class="${isLarge ? 'large-img' : ''}">
        <div class="info">
          <strong>${p.name}</strong>
          ${p.desc ? `<span>${p.desc}</span>` : ''}
        </div>
        ${p.img ? `<img src="${p.img}" alt="${p.name}" class="icon ${isLarge ? 'icon-large' : ''}">` : ''}
      </li>
    `;
  }).join('');
}


// Search filter logic
function handleSearch() {
  const q = input.value.trim().toLowerCase();
  const filtered = q
    ? perks.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.desc && p.desc.toLowerCase().includes(q))
      )
    : perks;
  renderList(filtered);
}

// Event: input in search bar
input.addEventListener('input', handleSearch);

// Event: mode selection
modeSelect.addEventListener('change', () => {
  const mode = modeSelect.value;

  // Hide search bar if no mode selected
  if (!mode) {
    searchContainer.style.display = 'none';
    return;
  }

  // Show search container and load correct data
  searchContainer.style.display = 'block';
  fetch(`${mode}.json`)
    .then(res => res.json())
    .then(data => {
      perks = data;
      input.value = '';
      renderList(perks);
    })
    .catch(err => {
      console.error('Failed to load mode data:', err);
      list.innerHTML = `<li>Error loading data for ${mode}</li>`;
    });
});

// Load the default mode on first page load
window.addEventListener('DOMContentLoaded', () => {
  if (modeSelect.value) {
    modeSelect.dispatchEvent(new Event('change'));
  }
});
