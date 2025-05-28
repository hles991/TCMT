let perks = [];

// grab DOM nodes
const input = document.getElementById('search');
const list  = document.getElementById('results');

// helper to render any array of perks
function renderList(items) {
  list.innerHTML = items
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
}

// load the data
fetch('perks.json')
  .then(res => res.json())
  .then(data => {
    perks = data;
    renderList(perks);              // show all perks initially
  })
  .catch(err => console.error(err));

// on input, either filter or show everything
input.addEventListener('input', () => {
  const q = input.value.trim().toLowerCase();
  const hits = q
    ? perks.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.desc && p.desc.toLowerCase().includes(q))
      )
    : perks;                      // no query → show all

  renderList(hits);
});

