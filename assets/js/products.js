/**
 * AeroGuard Product Catalog
 * Centralized data for prices, images, and descriptions
 */

const PRODUCTS = {
  'nasal-spray': {
    id: 'nasal-spray',
    name: 'Nasal Spray',
    price: 48,
    supply: '30-day supply',
    tagline: 'Binds & neutralizes dust allergens in the nasal passage.',
    icon: '💜',
    color: 'linear-gradient(135deg,#f0e8f5,#e8ddf0)',
    level: 'Nasal Relief Formula',
    image: 'assets/images/nasal_spray_product.png',
    category: 'Allergy Relief'
  },
  'atomizer': {
    id: 'atomizer',
    name: 'Atomizer',
    price: 48,
    supply: '30-day supply',
    tagline: 'Targets nasal and upper airway allergen exposure.',
    icon: '✨',
    color: 'linear-gradient(135deg,#e8f0f5,#dde8f0)',
    level: 'Nasal and Upper Airway Relief',
    image: 'assets/images/atomizer_product.png',
    category: 'Allergy Relief'
  },
  'inhalable-mist': {
    id: 'inhalable-mist',
    name: 'Inhalable Mist',
    price: 48,
    supply: '30-day supply',
    tagline: 'Throat and Upper Airway Relief',
    icon: '✨',
    color: 'linear-gradient(135deg,#e8f0f5,#dde8f0)',
    level: 'Throat Comfort Formula',
    image: 'assets/images/inhalermist_product.png',
    category: 'Allergy Relief'
  },
  'bundle': {
    id: 'bundle',
    name: 'Bundle',
    price: 68,
    supply: 'Save $28',
    tagline: 'Complete nasal and throat coverage.',
    icon: '🌿',
    color: 'linear-gradient(135deg,#f5f0e8,#f0ead8)',
    level: 'Complete Bundle — Best Value',
    image: 'assets/images/bundle_product.png',
    category: 'Allergy Relief'
  }
};

// Helper function to get product by ID or Name
const getProduct = (key) => PRODUCTS[key] || Object.values(PRODUCTS).find(p => p.name === key);