/**
 * AeroGuard Components Engine
 * Manages shared Header and Footer HTML
 */

const Components = {
  // Define the Navigation HTML
  header: `
    <nav>
      <a href="index.html" class="nav-logo">
        <img src="assets/images/aeroguard-logo.png" alt="AeroGuard logo">
        <span class="nav-logo-text">AeroGuard</span>
      </a>
      <ul class="nav-links">
        <li class="nav-dropdown">
          <a href="index.html#products">Products</a>
          <ul class="dropdown-menu">
            <li><a href="nasalspray.html">Nasal Spray</a></li>
          </ul>
        </li>
      </ul>
      <div class="nav-right">
        <a href="index.html#products" class="btn-sm">Shop Now</a>
        <button class="nav-cart-btn" id="navCart" onclick="window.location.href='cart.html'">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span class="nav-cart-badge" id="navCartBadge" style="display:none">0</span>
        </button>
      </div>
    </nav>
  `,

  // Define the Footer HTML
  footer: `
    <footer>
      <div class="footer-logo">
        <img src="assets/images/aeroguard-logo.png" alt="AeroGuard logo">
        <span class="footer-logo-text">AeroGuard</span>
      </div>
      <small>© 2026 AeroGuard. All rights reserved.</small>
      <div class="footer-links">
        <a href="#">Privacy</a><a href="#">Science</a><a href="#">Contact</a>
      </div>
    </footer>
  `,

  // Injection Logic
  init() {
    const headerPin = document.getElementById('nav-placeholder');
    const footerPin = document.getElementById('footer-placeholder');

    if (headerPin) headerPin.innerHTML = this.header;
    if (footerPin) footerPin.innerHTML = this.footer;

    // After injecting nav, ensure the cart badge is synced
    if (typeof Cart !== 'undefined') {
      Cart.updateUI();
    }
  }
};

// Initialize components when the script loads
document.addEventListener('DOMContentLoaded', () => Components.init());