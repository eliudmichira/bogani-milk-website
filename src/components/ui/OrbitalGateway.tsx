import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useTransform, useScroll, MotionValue } from 'framer-motion';
import BrandIdentity from './BrandIdentity';
import SearchTrigger from './SearchTrigger';
import CartIndicator from './CartIndicator';
import MegaMenu from './MegaMenu';

// Import navigation styling
import './orbital-gateway.css';

// Theme hook - replace with your actual theme system if available
const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Check for browser environment
    if (typeof window === 'undefined') return 'light';
    
    // Check for system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });
  
  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return { theme, setTheme };
};

// Types for navigation items
interface NavLink {
  name: string;
  path: string;
  megaMenuContent?: string;
  ariaLabel?: string;
}

// Props for the OrbitalGateway component
interface OrbitalGatewayProps {
  className?: string;
  stickyThreshold?: number;
  brandColor?: string;
  accentColor?: string;
}

// Navigation data
const navLinks: NavLink[] = [
  { name: 'HOME', path: '/', ariaLabel: 'Go to homepage' },
  { name: 'PRODUCTS', path: '/products', ariaLabel: 'Browse our products' },
  { name: 'ABOUT', path: '/about', ariaLabel: 'Learn about our company' },
  { name: 'CONTACT', path: '/contact', ariaLabel: 'Get in touch with us' },
];

export default function OrbitalGateway({ 
  className = '', 
  stickyThreshold = 100,
  brandColor = '#e60000',
  accentColor = '#e60000'
}: OrbitalGatewayProps) {
  // State management
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [hoverItem, setHoverItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Refs
  const navRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  
  // Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  // Use Framer Motion's useScroll for better performance
  const { scrollY } = useScroll();
  
  // Transform scroll values into animation values
  const scrollProgress = useTransform(scrollY, [0, stickyThreshold], [0, 1], { clamp: true });
  const navHeight = useTransform(scrollY, [0, stickyThreshold], [90, 70], { clamp: true });
  const navOpacity = useTransform(scrollY, [0, stickyThreshold/2], [0, 0.95], { clamp: true });
  const navBlur = useTransform(scrollY, [0, stickyThreshold/2], [0, 12], { clamp: true });
  
  // Colors based on theme
  const bgColor = useMemo(() => {
    return theme === 'dark' 
      ? "rgba(17, 24, 39, 0.9)" 
      : "rgba(255, 255, 255, 0.9)";
  }, [theme]);
  
  const textColor = useMemo(() => {
    return theme === 'dark' ? "#f3f4f6" : "#1f2937";
  }, [theme]);
  
  const borderColor = useMemo(() => {
    return theme === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
  }, [theme]);

  // Set active item based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const current = navLinks.find(link => 
      currentPath === link.path || 
      (link.path !== '/' && currentPath.startsWith(link.path))
    );
    setActiveItem(current?.name || null);
  }, [location]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent, linkName: string, linkPath: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(linkPath);
      setActiveItem(linkName);
      setHoverItem(null);
    }
  }, [navigate]);

  // Toggle menu handler for mobile
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setHoverItem(null);
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.nav 
      ref={navRef}
      className={`orbital-nav ${className}`}
      style={{
        backgroundColor: scrollProgress.get() > 0.1 ? bgColor : "transparent",
        backdropFilter: `blur(${navBlur.get()}px)`,
        boxShadow: scrollProgress.get() > 0.1 ? "0 10px 30px -10px rgba(0, 0, 0, 0.1)" : "none",
        height: navHeight,
        color: textColor,
        willChange: "backdrop-filter, background-color, box-shadow, height",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        borderBottom: scrollProgress.get() > 0.1 ? `1px solid ${borderColor}` : 'none'
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <BrandIdentity scrollProgress={scrollProgress} brandColor={brandColor} />
        
        {/* Mobile Menu Toggle - only visible on small screens */}
        <button 
          className="mobile-menu-toggle md:hidden flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500" 
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className={`hamburger-icon ${isMobileMenuOpen ? 'open' : ''}`}>
            <span style={{ backgroundColor: isMobileMenuOpen ? brandColor : textColor }}></span>
            <span style={{ backgroundColor: isMobileMenuOpen ? brandColor : textColor }}></span>
            <span style={{ backgroundColor: isMobileMenuOpen ? brandColor : textColor }}></span>
          </span>
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center space-x-8 lg:space-x-16">
          {navLinks.map((link, index) => (
            <NavItem
              key={link.name}
              link={link}
              isActive={activeItem === link.name}
              isHovered={hoverItem === link.name}
              onHover={() => setHoverItem(link.name)}
              onLeave={() => setHoverItem(null)}
              onKeyDown={(e) => handleKeyDown(e, link.name, link.path)}
              brandColor={brandColor}
              textColor={textColor}
              theme={theme}
            />
          ))}
        </div>
        
        {/* Utility Elements */}
        <div className="nav-utilities flex items-center space-x-4">
          <SearchTrigger theme={theme} accentColor={accentColor} />
          <CartIndicator theme={theme} accentColor={accentColor} />
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="mobile-menu"
            className="mobile-menu md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ 
              backgroundColor: theme === 'dark' ? "#1F2937" : "#FFFFFF",
              borderTop: `1px solid ${borderColor}`
            }}
          >
            <div className="py-4">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.path}
                  className="block py-3 px-6 text-lg font-medium transition-colors duration-200 relative"
                  style={{ 
                    color: activeItem === link.name ? brandColor : textColor
                  }}
                  whileHover={{ x: 10 }}
                  onClick={() => {
                    setActiveItem(link.name);
                    setIsMobileMenuOpen(false);
                  }}
                  aria-current={activeItem === link.name ? 'page' : undefined}
                >
                  {activeItem === link.name && (
                    <motion.span
                      layoutId="mobileActiveIndicator"
                      className="absolute left-0 top-1/2 transform -translate-y-1/2"
                      style={{ 
                        width: 4, 
                        height: 4, 
                        borderRadius: '50%', 
                        backgroundColor: brandColor
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="ml-4">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mega Menu - Desktop Only */}
      <AnimatePresence>
        {hoverItem && !isMobileMenuOpen && (
          <MegaMenu 
            item={hoverItem} 
            onClose={() => setHoverItem(null)} 
            theme={theme}
            accentColor={brandColor}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// NavItem component
interface NavItemProps {
  link: NavLink;
  isActive: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  brandColor: string;
  textColor: string;
  theme: 'light' | 'dark';
}

function NavItem({ 
  link, 
  isActive, 
  isHovered, 
  onHover, 
  onLeave, 
  onKeyDown,
  brandColor,
  textColor,
  theme 
}: NavItemProps) {
  return (
    <Link
      to={link.path}
      className="relative py-2 text-sm font-medium tracking-wider transition-colors duration-200 hover:text-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
      style={{
        color: isActive ? brandColor : textColor,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onKeyDown={onKeyDown}
      aria-current={isActive ? 'page' : undefined}
      aria-label={link.ariaLabel}
    >
      <span className="relative">
        {link.name}
        
        {/* Hover indicator */}
        <AnimatePresence>
          {isHovered && !isActive && (
            <motion.span
              className="absolute -bottom-1 left-0 w-full h-0.5 transform origin-left"
              style={{ backgroundColor: brandColor }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </span>
      
      {/* Active indicator (red dot) */}
      {isActive && (
        <motion.span
          layoutId="activeIndicator"
          className="absolute -top-2 left-1/2 transform -translate-x-1/2"
          style={{ 
            width: 6, 
            height: 6, 
            borderRadius: '50%', 
            backgroundColor: brandColor 
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
}