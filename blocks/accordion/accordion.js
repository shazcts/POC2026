export default function decorate(block) {
  console.log('✅ Accordion working');

  // Handle BOTH formats (table OR transformed list)
  let items = [];

  const rows = [...block.querySelectorAll('tr')];

  if (rows.length > 0) {
    // Table structure
    items = rows.slice(1).map((row) => {
      const cols = [...row.children];
      return {
        title: cols[0]?.textContent,
        desc: cols[1]?.textContent,
      };
    });
  } else {
    // Already transformed into list → extract from <li>
    items = [...block.querySelectorAll('li')].map((li) => {
      const heading = li.querySelector('strong, h3, h2')?.textContent || '';
      const text = li.querySelector('p')?.textContent || '';
      return {
        title: heading,
        desc: text,
      };
    });
  }

  // Replace DOM fully
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
