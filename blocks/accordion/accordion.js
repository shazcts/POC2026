export default function decorate(block) {
  console.log('✅ Accordion working');

  const items = [...block.querySelectorAll('li')].map((li) => {
    const cols = li.querySelectorAll('.cards-card-body');

    return {
      title: cols[0]?.textContent.trim(),
      desc: cols[1]?.textContent.trim(),
    };
  });

  block.innerHTML = `
    <div class="accordion">
      ${items.map(item => `
        <div class="accordion-item">
          <div class="accordion-header">${item.title}</div>
          <div class="accordion-content">${item.desc}</div>
        </div>
      `).join('')}
    </div>
  `;

  block.querySelectorAll('.accordion-header').forEach((header) => {
    header.addEventListener('click', () => {
      header.nextElementSibling.classList.toggle('open');
    });
  });
}
