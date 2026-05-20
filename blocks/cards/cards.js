export default function decorate(block) {
  console.log('✅ Custom Cards Accordion Loaded');

  const rows = [...block.querySelectorAll('tr')].slice(1);

  const items = rows.map((row) => {
    const cols = [...row.children];

    return `
      <div class="card">
        <div class="card-header">${cols[0].textContent}</div>
        <div class="card-content">${cols[1].textContent}</div>
      </div>
    `;
  });

  block.innerHTML = `<div class="accordion">${items.join('')}</div>`;

  // Accordion behavior
  block.querySelectorAll('.card-header').forEach((header) => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      content.classList.toggle('open');
    });
  });
}