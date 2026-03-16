/**
 * AeroGuard Components Engine
 * Manages shared Header and Footer HTML with dynamic pathing
 */

const Components = {
  // Define the Navigation HTML with the subfolder prefix (../) by default
  header: `
    <nav>
      <a href="../index.html" class="nav-logo">
        <img src="../assets/images/aeroguard-logo.png" alt="AeroGuard logo">
        <span class="nav-logo-text">AeroGuard</span>
      </a>
      <ul class="nav-links">
        <li class="nav-dropdown">
          <a href="../index.html#products">Products</a>
          <ul class="dropdown-menu">
            <li><a href="../products/nasalspray.html">Nasal Spray</a></li>
            <li><a href="../products/inhalermist.html">Inhalable Mist</a></li>
            <li><a href="../products/atomizer.html">Atomizer</a></li>
          </ul>
        </li>
      </ul>
      <div class="nav-right">
        <a href="../index.html#products" class="btn-sm">Shop Now</a>
        <button class="nav-cart-btn" id="navCart" onclick="window.location.href='../cart.html'">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span class="nav-cart-badge" id="navCartBadge" style="display:none">0</span>
        </button>
      </div>
    </nav>
  `,

  // Define the Footer HTML with the subfolder prefix (../) by default
  footer: `
    <footer>
      <div class="footer-logo">
        <img src="../assets/images/aeroguard-logo.png" alt="AeroGuard logo">
        <span class="footer-logo-text">AeroGuard</span>
      </div>
      <small>© 2026 AeroGuard. All rights reserved.</small>
      <div class="footer-links">
        <a href="#">Privacy</a><a href="../index.html#science">Science</a><a href="#">Contact</a>
      </div>
    </footer>
  `,

  // Injection Logic
  init() {
    const headerPin = document.getElementById('nav-placeholder');
    const footerPin = document.getElementById('footer-placeholder');

    // Detect if we are in a subfolder (like /products/)
    // This checks the URL bar of your browser
    const isSubfolder = window.location.pathname.includes('/products/');

    let finalHeader = this.header;
    let finalFooter = this.footer;

    if (!isSubfolder) {
      // If we are on the root (homepage), we REMOVE the "../" from all links
      // so they point correctly to assets/ or index.html
      finalHeader = this.header.split('../').join('');
      finalFooter = this.footer.split('../').join('');
    }

    // Inject the processed HTML into the page
    if (headerPin) headerPin.innerHTML = finalHeader;
    if (footerPin) footerPin.innerHTML = finalFooter;

    // Sync the cart badge if the cart engine is loaded
    if (typeof Cart !== 'undefined') {
      Cart.updateUI();
    }
  }
};

// Initialize components when the script loads
document.addEventListener('DOMContentLoaded', () => Components.init());