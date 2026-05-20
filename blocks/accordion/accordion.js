export default function decorate(block) {
  const items = [...block.children].map((row) => {
    return {
      title: row.children[0]?.textContent?.trim(),
      desc: row.children[1]?.textContent?.trim(),
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
    const content = header.nextElementSibling;

    // close all
    block.querySelectorAll('.accordion-content').forEach(c => {
      if (c !== content) {
        c.classList.remove('open');
      }
    });

    // toggle current
    content.classList.toggle('open');
  });
});
}

