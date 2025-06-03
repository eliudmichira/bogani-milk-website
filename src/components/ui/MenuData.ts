interface MenuItem {
  name: string;
  path: string;
}

interface MenuCategory {
  name: string;
  items: MenuItem[];
}

interface FeaturedProduct {
  name: string;
  image: string;
  description: string;
  path: string;
}

interface MenuData {
  categories: MenuCategory[];
  featured?: FeaturedProduct;
}

// Fallback menu data to use when specific data is not provided
const menuData: Record<string, MenuData> = {
  HOME: {
    categories: [
      { name: 'Welcome', items: [{ name: 'Home', path: '/' }] },
    ],
  },
  PRODUCTS: {
    categories: [
      { name: 'Yogurts', items: [
        { name: 'All Yogurts', path: '/products?cat=yogurt' },
        { name: 'Greek Yogurt', path: '/products?cat=greek' },
        { name: 'Plant-Based', path: '/products?cat=plant' },
      ] },
      { name: 'Drinks', items: [
        { name: 'Kefir', path: '/products?cat=kefir' },
        { name: 'Smoothies', path: '/products?cat=smoothie' },
      ] },
      { name: 'Snacks', items: [
        { name: 'Yogurt Bars', path: '/products?cat=bars' },
        { name: 'Dips', path: '/products?cat=dips' },
      ] },
    ],
    featured: {
      name: 'Premium Yogurt',
      image: '/src/assets/yogurt.jpg',
      description: 'Our best-selling yogurt, now in a new flavor!',
      path: '/products/1',
    },
  },
  ABOUT: {
    categories: [
      { name: 'Our Story', items: [{ name: 'Who We Are', path: '/about' }] },
      { name: 'Mission', items: [{ name: 'Our Mission', path: '/about#mission' }] },
    ],
  },
  CONTACT: {
    categories: [
      { name: 'Support', items: [{ name: 'Contact Us', path: '/contact' }] },
    ],
  },
};

// Function to get colors for particles based on menu item
export function getRandomColor(item: string): string {
  switch (item) {
    case 'PRODUCTS': return '#D50000';
    case 'ABOUT': return '#4CAF50';
    case 'CONTACT': return '#F2EA7E';
    default: return '#B71C1C';
  }
}

// Function to get menu data
export function getMenuData(item: string): MenuData {
  return menuData[item] || { categories: [] };
}

export default menuData; 