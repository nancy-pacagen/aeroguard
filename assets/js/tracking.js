/**
 * AeroGuard Tracking Engine
 * Initializes Converge pixel and centralizes event tracking (forwards to Meta automatically)
 */

// ── Initialize Converge pixel ──
window.cvg||(cvg=function(){cvg.process?cvg.process.apply(cvg,arguments):cvg.queue.push(arguments)},cvg.queue=[]);
const convergeScript = document.createElement('script');
convergeScript.src = 'https://static.runconverge.com/pixels/w557uh.js';
convergeScript.async = true;
document.head.appendChild(convergeScript);
cvg({ method: 'track', eventName: '$page_load' });

const Tracker = {
  /**
   * Core event dispatcher
   * @param {string} name - Event name (e.g., 'AddToCart', 'PageView')
   * @param {Object} props - Metadata for the event
   */
  event(name, props = {}) {
    if (typeof cvg === 'function') {
      cvg({ method: 'track', eventName: name, properties: props });
    }
  },

  /**
   * Standardized PageView tracking
   * @param {string} pageName - Friendly name of the page
   */
  pageView(pageName) {
    this.event('PageView', {
      page_path: window.location.pathname,
      page_title: pageName
    });
  }
};