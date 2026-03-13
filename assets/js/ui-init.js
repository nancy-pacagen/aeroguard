/**
 * AeroGuard UI Engine
 * Handles global interactions: Buy buttons, Accordions, and Scroll effects
 */

/**
 * AeroGuard UI Engine - FAQ Fix
 */
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. GLOBAL ADD-TO-CART (Keep existing)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-atc');
    if (btn) {
      btn.classList.add('added');
      setTimeout(() => btn.classList.remove('added'), 2200);
    }
  });

  // 2. FIXED FAQ ACCORDION LOGIC
  const faqQuestions = document.querySelectorAll('.faq__question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const currentItem = e.currentTarget.closest('.faq__item');
      if (!currentItem) return;

      const isAlreadyOpen = currentItem.classList.contains('open');

      // Close all other open items first
      document.querySelectorAll('.faq__item.open').forEach(openItem => {
        if (openItem !== currentItem) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle ONLY the current item
      if (isAlreadyOpen) {
        currentItem.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        currentItem.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard accessibility
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // 3. SCROLL-REVEAL (Keep existing)
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));
});