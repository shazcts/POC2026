export default function decorate(block) {
  console.log('✅ ACCORDION OVERRIDE RUNNING');

  // Remove default transformed content
  const rows = [...block.querySelectorAll('tr')].slice(1);

  // If rows not found (because already transformed), extract from <li>
  const items = rows.length
    ? rows.map((row) => {
        const cols = [...row.children];
        return {
          title: cols[0]?.textContent,
          desc: cols[1]?.textContent,
        };
      })
    : [...block.querySelectorAll('li')].map((li) => {
        const h = li.querySelector('h3,h2,h4')?.textContent || '';
        const p = li.querySelector('p')?.textContent || '';
        return { title: h, desc: p };
      });

  // FULL override
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

  // Accordion behavior
  block.querySelectorAll('.accordion-header').forEach((header) => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      content.classList.toggle('open');
    });
  });
}