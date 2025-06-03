import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Facebook, Twitter, Home, ShoppingBag, Info, Mail } from 'lucide-react';

// Import styles
import './mobile-navigation.css';

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUp = {
  hidden: (i: number) => ({
    y: 20,
    opacity: 0,
    transition: {
      delay: i * 0.1
    }
  }),
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  })
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
};

// Navigation items
const navLinks = [
  { name: 'HOME', path: '/', icon: 'Home' },
  { name: 'PRODUCTS', path: '/products', icon: 'Package' },
  { name: 'ABOUT', path: '/about', icon: 'Info' },
  { name: 'CONTACT', path: '/contact', icon: 'Mail' },
];

// Get icon component based on icon name
const getIconForLink = (iconName: string) => {
  switch (iconName) {
    case 'Home':
      return <Home size={24} />;
    case 'Package':
      return <ShoppingBag size={24} />;
    case 'Info':
      return <Info size={24} />;
    case 'Mail':
      return <Mail size={24} />;
    default:
      return <div className="w-6 h-6">{iconName.charAt(0)}</div>;
  }
};

// Get color for link based on name
const getColorForLink = (name: string) => {
  const colors = {
    'HOME': 'var(--color-primary)',
    'PRODUCTS': 'var(--color-secondary)', 
    'ABOUT': 'var(--color-tertiary)',
    'CONTACT': '#9C27B0',
  };
  
  return colors[name as keyof typeof colors] || 'var(--color-primary)';
};

// Throttle helper function
function throttle(func: Function, limit: number) {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Get current page from path
  const currentPage = navLinks.find(link => 
    location.pathname === link.path || 
    (link.path !== '/' && location.pathname.startsWith(link.path))
  )?.name || 'HOME';
  
  // Handle scroll events with throttling
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);
  
  // Apply throttling
  const throttledScrollHandler = useCallback(
    throttle(handleScroll, 100),
    [handleScroll]
  );
  
  useEffect(() => {
    window.addEventListener('scroll', throttledScrollHandler);
    return () => window.removeEventListener('scroll', throttledScrollHandler);
  }, [throttledScrollHandler]);
  
  return (
    <>
      <motion.nav 
        className="mobile-nav"
        animate={{
          backgroundColor: isOpen 
            ? "rgba(30, 41, 59, 0.95)" 
            : scrolled
              ? "rgba(255, 255, 255, 0.8)"
              : "rgba(255, 255, 255, 0)",
          backdropFilter: isOpen || scrolled
            ? "blur(10px)"
            : "blur(0px)",
          height: scrolled ? "60px" : "70px"
        }}
      >
        <div className="mobile-nav-container">
          <div className="brand-logo">
            <span className="primary">b</span>
            <span className="secondary">o</span>
            <span className="primary">gani</span>
          </div>
          
          <motion.div 
            className="current-page-indicator"
            animate={{
              x: isOpen ? 20 : 0,
              opacity: isOpen ? 0 : 1
            }}
          >
            {currentPage}
          </motion.div>
          
          <motion.button
            className="nebula-trigger"
            onClick={() => setIsOpen(!isOpen)}
            animate={{
              rotate: isOpen ? 135 : 0,
              backgroundColor: isOpen 
                ? "var(--color-primary)" 
                : "var(--glass-background)"
            }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <motion.span 
              animate={{ 
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 0 : -4
              }}
            />
            <motion.span 
              animate={{ 
                opacity: isOpen ? 0 : 1,
                x: isOpen ? 20 : 0
              }}
            />
            <motion.span 
              animate={{ 
                rotate: isOpen ? -45 : 0,
                y: isOpen ? 0 : 4
              }}
            />
          </motion.button>
        </div>
      </motion.nav>
      
      <AnimatePresence>
        {isOpen && (
          <NebulaMenu onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function NebulaMenu({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  
  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };
  
  return (
    <motion.div
      className="nebula-menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="nebula-background">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="star"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, Math.random() * 0.7 + 0.3, 0],
              scale: [0, Math.random() * 0.5 + 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              delay: Math.random() * 0.5,
              repeat: Infinity,
              repeatType: "loop"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`
            }}
          />
        ))}
      </motion.div>
      
      <div className="nebula-content">
        <motion.div 
          className="nebula-items"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              className="nebula-item"
              variants={fadeInUp}
              custom={index}
              onClick={() => handleNavigate(link.path)}
            >
              <motion.div 
                className="nebula-icon"
                style={{
                  backgroundColor: getColorForLink(link.name)
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {getIconForLink(link.icon)}
              </motion.div>
              <span>{link.name}</span>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="nebula-secondary"
          variants={fadeIn}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.5 }}
        >
          <div className="secondary-links">
            <Link to="/account">Account</Link>
            <Link to="/support">Support</Link>
            <Link to="/faq">FAQs</Link>
          </div>
          
          <div className="social-links">
            <a href="#"><Instagram size={18} /></a>
            <a href="#"><Facebook size={18} /></a>
            <a href="#"><Twitter size={18} /></a>
          </div>
        </motion.div>
      </div>
      
      <motion.button
        className="nebula-close"
        onClick={onClose}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Close menu"
      >
        <X size={24} />
      </motion.button>
    </motion.div>
  );
}

export default MobileNavigation; 