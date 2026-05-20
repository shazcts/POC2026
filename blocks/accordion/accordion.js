export default function decorate(block) {
  const rows = [...block.querySelectorAll('tr')].slice(1);

  const accordionItems = rows.map((row) => {
    const cols = [...row.children];

    return `
      <div class="accordion-item">
        <button class="accordion-header">
          ${cols[0].textContent}
        </button>
        <div class="accordion-content">
          <p>${cols[1].textContent}</p>
        </div>
      </div>
    `;
  });

  block.innerHTML = `<div class="accordion">${accordionItems.join('')}</div>`;

  // Add toggle behavior
  block.querySelectorAll('.accordion-header').forEach((btn) => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      content.classList.toggle('open');
    });
  });
}
