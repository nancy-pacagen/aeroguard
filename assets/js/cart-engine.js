/**
 * AeroGuard Cart Engine
 * Manages localStorage, Cart UI updates, and tracking integration
 */

const Cart = {
  // Load initial state from storage or empty object
  state: JSON.parse(localStorage.getItem('aeroguard_cart') || '{}'),

  /**
   * Adds an item to the cart
   * @param {string} productId - Key from the PRODUCTS object in products.js
   */
  add(productId) {
    const product = getProduct(productId); // Helper from products.js
    if (!product) {
      console.error(`Product ID "${productId}" not found in catalog.`);
      return;
    }

    // Update Internal State
    this.state[product.name] = (this.state[product.name] || 0) + 1;
    this.save();

    // Trigger UI Updates
    this.updateUI(product.name);

    // Track AddToCart Event (Converge format)
    Tracker.event('AddToCart', {
      product_id: product.id,
      product_name: product.name,
      product_price: product.price,
      currency: 'USD'
    });
  },

  /**
   * Synchronizes state with localStorage
   */
  save() {
    try {
      localStorage.setItem('aeroguard_cart', JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  },

  /**
   * Updates the Navigation Badge and triggers the Toast notification
   * @param {string} lastAddedName - Name of the product most recently added
   */
  updateUI(lastAddedName = null) {
    const totalItems = Object.values(this.state).reduce((a, b) => a + b, 0);
    
    // 1. Update Navigation Badge
    const badge = document.getElementById('navCartBadge');
    if (badge) {
      badge.textContent = totalItems;
      badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // 2. Trigger Toast (If on a page with the toast element)
    if (lastAddedName) {
      this.showToast(lastAddedName, totalItems);
    }
  },

  /**
   * Displays the popup "Toast" notification
   */
  showToast(name, count) {
    const toast = document.getElementById('cartToast');
    const toastMsg = document.getElementById('toastMsg');
    const toastBadge = document.getElementById('toastBadge');

    if (toast && toastMsg && toastBadge) {
      toastMsg.textContent = `${name} added`;
      toastBadge.textContent = count;
      
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
    }
  }
};

/**
 * Global helper to format cart data for URL passing
 * Used by navigation to go to cart.html?cart=...
 */
function goToCart() {
  const cartData = encodeURIComponent(JSON.stringify(Cart.state));
  window.location.href = `cart.html?cart=${cartData}`;
}