/**
 * PSP Ventures - Products Showcase JavaScript
 * Author: Antigravity Code Assistant
 * Core interactive scripts: category filtering and product status layouts
 */

document.addEventListener('DOMContentLoaded', () => {
  initProductFilters();
});

/* ==========================================================================
   Product Category Filtering
   ========================================================================== */
function initProductFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card-wrapper');

  if (filterButtons.length === 0 || productCards.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 1. Update Active Button Styling
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      // 2. Filter Cards with Smooth Animation
      productCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');

        if (filterValue === 'all' || categories.includes(filterValue)) {
          // Show Card
          card.style.display = 'block';
          // Fade-in animation sequence
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          // Hide Card with Fade-out
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300); // match fade-out duration
        }
      });
    });
  });

  // Apply initial inline styles for transition animation to card wrappers
  productCards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    card.style.opacity = '1';
    card.style.transform = 'scale(1)';
  });
}
