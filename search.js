let perks = [];

// Load the data
fetch('perks.json')
  .then(res => res.json())
  .then(data => perks = data)
  .catch(err => console.error('Error loading perks.json:', err));

const input = document.getElementById('search');
const list  = document.getElementById('results');

input.addEventListener('input', () => {
  const q = input.value.trim().toLowerCase();
  if (!q) {
    list.innerHTML = '';
    return;
  }

  // Simple “type-ahead” filter
  const hits = perks.filter(p =>
    p.name.toLowerCase().includes(q) ||
    (p.desc && p.desc.toLowerCase().includes(q))
  );

  // Render results with optional icon
  list.innerHTML = hits
    .map(p => `
      <li>
        ${p.img
          ? `<img src="${p.img}" alt="${p.name}" class="icon">`
          : ''
        }
        <div class="info">
          <strong>${p.name}</strong>
          ${p.desc ? `<span>${p.desc}</span>` : ''}
        </div>
      </li>
    `)
    .join('');
});

