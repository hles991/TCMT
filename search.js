let perks = [];

// grab DOM nodes
const input = document.getElementById('search');
const list  = document.getElementById('results');
const modeSelect = document.getElementById('modeSelect');
const searchContainer = document.getElementById('searchContainer');

// render function
function renderList(items) {
  list.innerHTML = items
    .map(p => `
      <li>
        ${p.img ? `<img src="${p.img}" alt="${p.name}" class="icon">` : ''}
        <div class="info">
          <strong>${p.name}</strong>
          ${p.desc ? `<span>${p.desc}</span>` : ''}
        </div>
      </li>
    `).join('');
}

// setup search input listener
input.addEventListener('input', () => {
  const q = input.value.trim().toLowerCase();
  const filtered = q
    ? perks.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.desc && p.desc.toLowerCase().includes(q))
      )
    : perks;
  renderList(filtered);
});

// when a mode is selected
modeSelect.addEventListener('change', () => {
  const mode = modeSelect.value;
  if (!mode) {
    searchContainer.style.display = 'none';
    return;
  }

  fetch(`${mode}.json`) // e.g., bloodrush.json
    .then(res => res.json())
    .then(data => {
      perks = data;
      renderList(perks);
      input.value = '';
      searchContainer.style.display = 'block';
    })
    .catch(err => console.error('Error loading mode data:', err));
});

// Automatically load Blood Rush if it's the default
if (modeSelect.value === 'bloodrush') {
  modeSelect.dispatchEvent(new Event('change'));
}
