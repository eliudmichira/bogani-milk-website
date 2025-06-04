import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  User, 
  X, 
  ChevronDown, 
  Sun, 
  Moon, 
  Heart,
  Star,
  Info,
  Phone,
  Sparkles
} from 'lucide-react';
import whiteLogo from "../../assets/white bogani logo.png";
import blackLogo from "../../assets/black bogani logo.png";
import { useTheme } from '../../context/ThemeContext'; // Import actual useTheme

// Optional interface for theme context if you're using a theme provider
// interface ThemeContextType { // This might be defined in ThemeContext.tsx
//   theme: 'light' | 'dark';
//   toggleTheme: () => void;
// }

// useFakeTheme hook definition removed.

interface NavItemProps {
  to: string;
  label: string;
  isActive: boolean;
  hasDropdown?: boolean;
  children?: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, isActive, hasDropdown, children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => hasDropdown && setIsDropdownOpen(true)}
      onMouseLeave={() => hasDropdown && setIsDropdownOpen(false)}
    >
      <Link
        to={to}
        className={`flex items-center px-4 py-2 rounded-full text-base font-medium font-sans transition-all duration-300 ${
          isActive 
            ? 'text-[color:var(--fresh-berry-red)] dark:text-[color:var(--fresh-berry-red)]' 
            : 'text-[color:var(--charcoal-black)] dark:text-[color:var(--bright-white)] hover:text-[color:var(--fresh-berry-red)] dark:hover:text-[color:var(--fresh-berry-red)]'
        }`}
      >
        {label}
      </Link>
      
      {isActive && (
        <motion.div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-yogurt-red dark:bg-yogurt-red/90 rounded-full"
          layoutId="activeNavIndicator"
          initial={{ width: 0 }}
          animate={{ width: '20px' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
      
      {hasDropdown && (
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-2 w-56 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-30"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

const DropdownItem: React.FC<{ to: string; label: string; description?: string; icon?: React.ReactNode }> = ({ 
  to, label, description, icon 
}) => (
  <Link
    to={to}
    className="flex items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
  >
    {icon && (
      <div className="mr-3 mt-0.5 flex-shrink-0 h-9 w-9 rounded-full bg-yogurt-red/10 dark:bg-yogurt-red/20 flex items-center justify-center text-yogurt-red dark:text-yogurt-red/90">
        {icon}
      </div>
    )}
    <div>
      <p className="font-medium font-sans text-[color:var(--charcoal-black)] dark:text-[color:var(--bright-white)]">{label}</p>
      {description && <p className="text-xs font-sans text-[color:var(--charcoal-black)]/70 dark:text-[color:var(--bright-white)]/70 mt-0.5">{description}</p>}
    </div>
  </Link>
);

interface NavbarProps {
  cartItemCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartItemCount = 0 }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme(); // Use actual useTheme
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navbarClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    isScrolled 
      ? 'bg-[color:var(--bright-white)]/80 dark:bg-[color:var(--background-dark)]/80 backdrop-blur-lg py-2 shadow-md'
      : 'bg-[color:var(--bright-white)] dark:bg-transparent py-2'
  }`;
  
  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={navbarClasses}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="relative mr-2">
              <motion.div 
                className="absolute -top-1 -right-1 w-2 h-2 bg-accentGreen rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <img 
                src={theme === 'dark' ? whiteLogo : blackLogo} 
                alt="Bogani Logo" 
                className="h-16 w-auto rounded-full"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 font-sans">
            <NavItem to="/" label="Home" isActive={isActive('/')} />
            
            <NavItem to="/products" label="Products" isActive={isActive('/products')} hasDropdown>
              <div>
                <DropdownItem 
                  to="/products/original" 
                  label="Original Probiotic" 
                  description="Our classic probiotic yogurt"
                  icon={<Star size={18} />}
                />
                <DropdownItem 
                  to="/products/vanilla" 
                  label="Vanilla Bean" 
                  description="Rich vanilla flavor profile"
                  icon={<Sparkles size={18} />}
                />
                <DropdownItem 
                  to="/products/berry" 
                  label="Berry Boost" 
                  description="Blend of antioxidant-rich berries"
                  icon={<Heart size={18} />}
                />
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                  <Link 
                    to="/products" 
                    className="text-sm font-medium text-yogurt-red dark:text-yogurt-red/90 hover:text-berry dark:hover:text-berry/90 flex items-center justify-between"
                  >
                    View All Products
                  </Link>
                </div>
              </div>
            </NavItem>
            
            <NavItem to="/about" label="About Us" isActive={isActive('/about')} />
            
            <NavItem to="/blog" label="Blog" isActive={isActive('/blog')} />
            
            <NavItem to="/contact" label="Contact" isActive={isActive('/contact')} />
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3 md:space-x-4 font-sans">
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full text-[color:var(--charcoal-black)] dark:text-[color:var(--bright-white)] hover:bg-[color:var(--bogani-green)]/10 dark:hover:bg-[color:var(--bogani-green)]/20 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full text-[color:var(--charcoal-black)] dark:text-[color:var(--bright-white)] hover:bg-[color:var(--bogani-green)]/10 dark:hover:bg-[color:var(--bogani-green)]/20 transition-colors"
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            >
              {theme === 'light' ? <Moon size={20} className="text-gray-700 dark:text-gray-300" /> : <Sun size={20} className="text-yellow-500 dark:text-yellow-400" />}
            </motion.button>

            {/* User Menu - Now always visible for Account link */}
            <div className="relative group">
              <Link 
                to="/accounts" 
                className="p-2 rounded-full text-[color:var(--charcoal-black)] dark:text-[color:var(--bright-white)] hover:bg-[color:var(--bogani-green)]/10 dark:hover:bg-[color:var(--bogani-green)]/20 transition-colors flex items-center"
                aria-label="My Account"
              >
                <User size={20} />
              </Link>
            </div>
            
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-full text-[color:var(--charcoal-black)] dark:text-[color:var(--bright-white)] hover:bg-[color:var(--bogani-green)]/10 dark:hover:bg-[color:var(--bogani-green)]/20 transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[color:var(--fresh-berry-red)] text-[color:var(--bright-white)] text-xs flex items-center justify-center"
                >
                  {cartItemCount}
                </motion.div>
              )}
            </Link>
            
            {/* Mobile Menu Button - Hiding this as AnimatedDock will handle mobile nav */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hidden p-2 rounded-full text-[color:var(--charcoal-black)] dark:text-[color:var(--bright-white)] hover:bg-[color:var(--bogani-green)]/10 dark:hover:bg-[color:var(--bogani-green)]/20 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen.toString()}
              aria-controls="mobile-menu-overlay"
            >
              {mobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              id="mobile-menu-overlay"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute top-0 right-0 w-4/5 max-w-sm h-full bg-white dark:bg-gray-900 shadow-xl p-5 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="font-display text-xl font-bold font-sans bg-gradient-to-r from-[color:var(--fresh-berry-red)] to-[color:var(--bogani-green)] bg-clip-text text-transparent">
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full text-[color:var(--charcoal-black)] dark:text-[color:var(--bright-white)] hover:bg-[color:var(--bogani-green)]/10 dark:hover:bg-[color:var(--bogani-green)]/20 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Mobile Navigation Links */}
              <div className="py-4 space-y-2">
                <MobileNavItem to="/" label="Home" icon={<Home size={20} />} />
                <MobileNavItem to="/products" label="Products" icon={<Package size={20} />} />
                <MobileNavItem to="/about" label="About Us" icon={<Info size={20} />} />
                <MobileNavItem to="/blog" label="Blog" icon={<BookOpen size={20} />} />
                <MobileNavItem to="/contact" label="Contact" icon={<Phone size={20} />} />
                <MobileNavItem to="/accounts" label="My Account" icon={<User size={20} />} />
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-display text-sm font-bold font-sans text-[color:var(--charcoal-black)] dark:text-[color:var(--bright-white)]">
                    CUSTOMER
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <MobileNavItem to="/saved-items" label="Saved Items" icon={<Heart size={18} />} />
                  <MobileNavItem to="/orders" label="My Orders" icon={<Package size={18} />} />
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium font-sans text-[color:var(--charcoal-black)] dark:text-[color:var(--bright-white)]">
                      {theme === 'light' ? 'Light' : 'Dark'} Mode
                    </span>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative transition-colors focus:outline-none"
                  >
                    <motion.div
                      className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white"
                      animate={{ 
                        x: theme === 'dark' ? 24 : 0,
                        backgroundColor: theme === 'dark' ? '#D50000' : '#FFFFFF'
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Missing Lucide icons for mobile menu
const Home = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const BookOpen = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const Package = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.29 7 12 12 20.71 7"></polyline>
    <line x1="12" x2="12" y1="22" y2="12"></line>
  </svg>
);

const MobileNavItem: React.FC<{ to: string; label: string; icon?: React.ReactNode }> = ({ 
  to, label, icon 
}) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <Link
      to={to}
      className={`flex items-center p-3 rounded-lg transition-colors font-sans font-medium text-base ${
        isActive 
          ? 'bg-[color:var(--fresh-berry-red)]/10 text-[color:var(--fresh-berry-red)] dark:bg-[color:var(--fresh-berry-red)]/20 dark:text-[color:var(--fresh-berry-red)]' 
          : 'text-[color:var(--charcoal-black)] dark:text-[color:var(--bright-white)] hover:bg-[color:var(--bogani-green)]/10 dark:hover:bg-[color:var(--bogani-green)]/20'
      }`}
    >
      {icon && <span className="mr-3">{icon}</span>}
      <span className="font-medium font-sans">{label}</span>
      {isActive && (
        <motion.div
          layoutId="mobileNavIndicator"
          className="ml-auto w-1.5 h-1.5 rounded-full bg-[color:var(--fresh-berry-red)] dark:bg-[color:var(--fresh-berry-red)]"
        />
      )}
    </Link>
  );
};

export default Navbar; 