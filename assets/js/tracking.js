/**
 * AeroGuard Tracking Engine
 * Centralizes Meta Pixel and internal console logging
 */

const Tracker = {
  /**
   * Core event dispatcher
   * @param {string} name - Event name (e.g., 'AddToCart', 'PageView')
   * @param {Object} props - Metadata for the event
   */
  event(name, props = {}) {
    // 1. Internal Debug Logging
    console.log(`[Analytics] ${name}`, props);

    // 2. Meta Pixel Tracking
    if (typeof fbq === 'function') {
      fbq('track', name, props);
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

// Auto-track scroll milestones (25%, 50%, 75%, 90%)
let scrollMilestones = new Set();
window.addEventListener('scroll', () => {
  const scrollPct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
  [25, 50, 75, 90].forEach(m => {
    if (scrollPct >= m && !scrollMilestones.has(m)) {
      scrollMilestones.add(m);
      Tracker.event('ScrollDepth', { percent: m });
    }
  });
});