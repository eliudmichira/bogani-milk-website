import { useRef, useEffect } from 'react';import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface MenuCategory {
  name: string;
  items: { name: string; path: string }[];
}

interface FeaturedProduct {
  name: string;
  image: string;
  description: string;
  path: string;
}

interface MegaMenuProps {
  item: string;
  onClose: () => void;
  theme?: 'light' | 'dark';
  accentColor?: string;
}

// Fallback demo data if not provided
const fallbackMenuData: Record<string, { categories: MenuCategory[]; featured?: FeaturedProduct }> = {
  PRODUCTS: {
    categories: [
      { 
        name: 'Yogurts', 
        items: [
          { name: 'All Yogurts', path: '/products?cat=yogurt' },
          { name: 'Greek Yogurt', path: '/products?cat=greek' },
          { name: 'Plant-Based', path: '/products?cat=plant' },
        ] 
      },
      { 
        name: 'Drinks', 
        items: [
          { name: 'Kefir', path: '/products?cat=kefir' },
          { name: 'Smoothies', path: '/products?cat=smoothie' },
        ] 
      },
      { 
        name: 'Snacks', 
        items: [
          { name: 'Yogurt Bars', path: '/products?cat=bars' },
          { name: 'Dips', path: '/products?cat=dips' },
        ] 
      },
    ],
    featured: {
      name: 'Premium Yogurt',
      image: '/src/assets/brand yogurt.jpg',
      description: 'Our best-selling probiotic yogurt, crafted with care to nourish your body and delight your taste buds.',
      path: '/products/1',
    },
  },
  ABOUT: {
    categories: [
      { 
        name: 'Our Story', 
        items: [
          { name: 'Who We Are', path: '/about' },
          { name: 'Our Journey', path: '/about#journey' },
          { name: 'Team', path: '/about#team' }
        ] 
      },
      { 
        name: 'Mission', 
        items: [
          { name: 'Our Mission', path: '/about#mission' },
          { name: 'Sustainability', path: '/about#sustainability' },
          { name: 'Quality Promise', path: '/about#quality' }
        ] 
      },
    ],
    featured: {
      name: 'From Farm to Table',
      image: '/src/assets/farm.jpg',
      description: 'Learn about our commitment to quality, sustainability, and the well-being of our community.',
      path: '/about',
    },
  },
  CONTACT: {
    categories: [
      { 
        name: 'Support', 
        items: [
          { name: 'Contact Us', path: '/contact' },
          { name: 'FAQs', path: '/contact#faqs' },
          { name: 'Feedback', path: '/contact#feedback' }
        ] 
      },
      { 
        name: 'Connect', 
        items: [
          { name: 'Social Media', path: '/contact#social' },
          { name: 'Newsletter', path: '/contact#newsletter' }
        ] 
      },
    ],
    featured: {
      name: 'Customer Service',
      image: '/src/assets/customer-service.jpg',
      description: 'Our team is here to help. Reach out to us with any questions or feedback.',
      path: '/contact',
    },
  },
  HOME: {
    categories: [
      { 
        name: 'Welcome', 
        items: [
          { name: 'Home', path: '/' },
          { name: 'Featured Products', path: '/#featured' },
          { name: 'Testimonials', path: '/#testimonials' }
        ] 
      },
    ],
  },
};

export default function MegaMenu({ item, onClose, theme = 'light', accentColor }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Keyboard accessibility: close on Esc
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Use fallback data
  const menuData = fallbackMenuData[item] || { categories: [], featured: undefined };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  const featuredVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: 0.2,
        duration: 0.4
      }
    }
  };

  // Dynamic colors based on theme
  const colors = {
    background: theme === 'dark' ? 'rgba(17, 24, 39, 0.97)' : 'rgba(255, 255, 255, 0.97)',
    text: theme === 'dark' ? '#f3f4f6' : '#1f2937',
    accent: theme === 'dark' ? '#4FD1C5' : '#2E7D32',
    border: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    categoryBg: theme === 'dark' ? 'rgba(31, 41, 55, 0.5)' : 'rgba(249, 250, 251, 0.5)',
    buttonBg: theme === 'dark' ? '#4FD1C5' : '#2E7D32',
    buttonText: '#ffffff',
    hover: theme === 'dark' ? 'rgba(79, 209, 197, 0.1)' : 'rgba(46, 125, 50, 0.1)',
  };

  return (
    <motion.div
      ref={menuRef}
      className="mega-menu"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onMouseLeave={onClose}
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '2rem',
        backgroundColor: colors.background,
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${colors.border}`,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        color: colors.text,
        overflow: 'hidden'
      }}
      tabIndex={0}
      aria-label={`${item} menu`}
      role="menu"
    >
      <div className="mega-menu-inner" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="menu-header" style={{ marginBottom: '1.5rem', position: 'relative' }}>
          <motion.h3 
            style={{ 
              fontSize: '1.5rem', 
              fontWeight: 700, 
              color: colors.accent,
              margin: 0,
              position: 'relative',
              display: 'inline-block'
            }}
          >
            {item}
            <motion.div 
              style={{ 
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                height: '2px',
                width: '100%',
                backgroundColor: colors.accent
              }}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.4, delay: 0.2 }}
            />
          </motion.h3>
        </div>

        <div 
          className="menu-content" 
          style={{ 
            display: 'grid',
            gridTemplateColumns: menuData.featured 
              ? 'repeat(auto-fit, minmax(180px, 1fr)) 300px' 
              : 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            alignItems: 'start'
          }}
        >
          {menuData.categories.map((category) => (
            <motion.div
              key={category.name}
              className="menu-category"
              variants={categoryVariants}
              style={{
                padding: '1rem',
                backgroundColor: colors.categoryBg,
                borderRadius: '0.5rem',
                height: '100%'
              }}
            >
              <h4 style={{ 
                fontSize: '1rem', 
                fontWeight: 600,
                marginTop: 0,
                marginBottom: '0.75rem',
                paddingBottom: '0.5rem',
                borderBottom: `1px solid ${colors.border}`
              }}>
                {category.name}
              </h4>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem' 
              }}>
                {category.items.map((menuItem) => (
                  <motion.li
                    key={menuItem.name}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    style={{ position: 'relative' }}
                  >
                    <Link 
                      to={menuItem.path} 
                      tabIndex={0} 
                      role="menuitem"
                      onClick={onClose}
                      style={{
                        display: 'block',
                        padding: '0.5rem',
                        textDecoration: 'none',
                        color: 'inherit',
                        borderRadius: '0.25rem',
                        transition: 'background-color 0.2s ease',
                        position: 'relative',
                        paddingLeft: '1.25rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = colors.hover;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <motion.span 
                        style={{ 
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: colors.accent,
                          opacity: 0.7
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                      {menuItem.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {menuData.featured && (
            <motion.div 
              className="featured-item"
              variants={featuredVariants}
              style={{
                gridColumn: menuData.categories.length > 2 ? 'span 1' : 'span 1',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: colors.categoryBg,
                borderRadius: '0.5rem',
                overflow: 'hidden',
                height: '100%'
              }}
            >
              <div style={{ position: 'relative', overflow: 'hidden', height: '160px' }}>
                <motion.img 
                  src={menuData.featured.image} 
                  alt={menuData.featured.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%)'
                }}/>
              </div>
              
              <div style={{ padding: '1rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: 600, 
                  margin: '0 0 0.5rem',
                  color: colors.accent
                }}>
                  {menuData.featured.name}
                </h4>
                <p style={{ 
                  fontSize: '0.875rem', 
                  margin: '0 0 1rem',
                  flexGrow: 1
                }}>
                  {menuData.featured.description}
                </p>
                <Link 
                  to={menuData.featured.path} 
                  tabIndex={0} 
                  role="menuitem"
                  onClick={onClose}
                  style={{ display: 'block', marginTop: 'auto' }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      backgroundColor: colors.buttonBg,
                      color: colors.buttonText,
                      border: 'none',
                      borderRadius: '0.25rem',
                      padding: '0.5rem 1rem',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    Explore
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}