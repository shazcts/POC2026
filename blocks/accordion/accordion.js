export default function decorate(block) {
  console.log('✅ Accordion working');

  const rows = [...block.children];

  const items = rows.map((row) => {
    const cols = [...row.children];

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

  const itemsEls = block.querySelectorAll('.accordion-item');

  itemsEls.forEach((item) => {
    item.querySelector('.accordion-header').addEventListener('click', () => {

      // ✅ SINGLE OPEN (better UX)
      itemsEls.forEach(i => {
        if (i !== item) i.classList.remove('open');
      });

      // toggle current
      item.classList.toggle('open');
    });
  });
}
