/**
 * AeroGuard Components Engine
 * Manages shared Header and Footer HTML with dynamic pathing
 * Updated: mobile-friendly hamburger + tap-to-toggle Products dropdown
 */

const Components = {
  // Define the Navigation HTML with the subfolder prefix (../) by default
  header: `
    <nav>
      <a href="../index.html" class="nav-logo">
        <img src="../assets/images/aeroguard-logo.png" alt="AeroGuard logo">
        <span class="nav-logo-text">AeroGuard</span>
      </a>

      <!-- Hamburger button (visible on mobile only) -->
      <button class="nav-hamburger" id="navHamburger" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>

      <!-- Nav links — hidden on mobile until hamburger is tapped -->
      <ul class="nav-links" id="navLinks">
        <li class="nav-dropdown">
          <!-- Products link + chevron toggle button -->
          <a href="../index.html#products">Shop Now</a>
          <button class="dropdown-toggle" aria-expanded="false" aria-label="Toggle Products menu">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="2 4 6 8 10 4"/>
            </svg>
          </button>
          <ul class="dropdown-menu">
            <li><a href="../products/nasalspray.html">Nasal Spray</a></li>
            <li><a href="../products/inhalermist.html">Inhalable Mist</a></li>
            <li><a href="../products/atomizer.html">Atomizer</a></li>
          </ul>
        </li>
      </ul>

      <div class="nav-right">
        <a href="../index.html#products" class="btn-sm">Products</a>
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

  // Injection + mobile interaction logic
  init() {
    const headerPin = document.getElementById('nav-placeholder');
    const footerPin = document.getElementById('footer-placeholder');

    const isSubfolder = window.location.pathname.includes('/products/');

    let finalHeader = this.header;
    let finalFooter = this.footer;

    if (!isSubfolder) {
      finalHeader = this.header.split('../').join('');
      finalFooter = this.footer.split('../').join('');
    }

    if (headerPin) headerPin.innerHTML = finalHeader;
    if (footerPin) footerPin.innerHTML = finalFooter;

    // ── Mobile: hamburger toggles the full nav-links panel ──
    const hamburger = document.getElementById('navHamburger');
    const navLinks  = document.getElementById('navLinks');

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        const open = navLinks.classList.toggle('nav-open');
        hamburger.setAttribute('aria-expanded', open);
        hamburger.classList.toggle('is-open', open);
      });
    }

    // ── Mobile: chevron button tap-toggles the Products dropdown ──
    // (On desktop the dropdown still opens on hover via CSS)
    document.querySelectorAll('.dropdown-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // don't bubble up to the hamburger close handler
        const li = btn.closest('.nav-dropdown');
        const isOpen = li.classList.toggle('dropdown-open');
        btn.setAttribute('aria-expanded', isOpen);
      });
    });

    // ── Mobile: block the Products link from navigating on mobile ──
    // Tapping the "Products" text toggles the dropdown instead of navigating.
    // On desktop (>768px) the link navigates normally; dropdown opens on hover via CSS.
    document.querySelectorAll('.nav-dropdown > a').forEach(link => {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const li = link.closest('.nav-dropdown');
          const btn = li.querySelector('.dropdown-toggle');
          const isOpen = li.classList.toggle('dropdown-open');
          if (btn) btn.setAttribute('aria-expanded', isOpen);
        }
      });
    });

    // Close nav + dropdown when any nav link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks && navLinks.classList.remove('nav-open');
        hamburger && hamburger.classList.remove('is-open');
        document.querySelectorAll('.nav-dropdown').forEach(li => li.classList.remove('dropdown-open'));
      });
    });

    // Sync the cart badge if the cart engine is loaded
    if (typeof Cart !== 'undefined') {
      Cart.updateUI();
    }
  }
};

document.addEventListener('DOMContentLoaded', () => Components.init());
