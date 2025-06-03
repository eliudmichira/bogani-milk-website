import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HomeIcon, InfoIcon, MailIcon, ShoppingCartIcon, LayoutGridIcon, RssIcon } from 'lucide-react';
import { cn } from './lib/utils';
import { ThemeProvider } from './context/ThemeContext';
import { useThemeToggle } from './components/ui/BiosphereComponents';

import AnimatedDock from './components/animata/container/AnimatedDock';
import { FooterSection } from './components/ui/FooterSection';
import Preloader from './components/Preloader';
import Navbar from './components/ui/Navbar';

// Simple placeholder for loading states
const SimplePlaceholder = () => <div style={{ height: '70px' }}></div>;

// Lazy load pages
const HomePage = lazy(() => import('./pages/Home'));
const ProductsPage = lazy(() => import('./pages/Products'));
// ProductDetail page now redirects to Products
const ProductDetailPage = lazy(() => import('./pages/ProductDetail'));
const AboutPage = lazy(() => import('./pages/About'));
const ContactPage = lazy(() => import('./pages/Contact'));
const CartPage = lazy(() => import('./pages/Cart'));
const BlogPage = lazy(() => import('./pages/Blog'));
const AccountsPage = lazy(() => import('./pages/Accounts'));
const BlogPostPage = lazy(() => import('./pages/BlogPost'));

// Product Pages
const OriginalProduct = lazy(() => import('./pages/products/Original'));
const VanillaProduct = lazy(() => import('./pages/products/Vanilla'));
const BerryProduct = lazy(() => import('./pages/products/Berry'));

function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useThemeToggle();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Adjust timing as needed (e.g., 5000ms = 5 seconds)

    return () => clearTimeout(timer);
  }, []);

  // Define dock items
  const dockItems = [
    { title: 'Home', href: '/', icon: <HomeIcon size={24} />, isNavLink: true },
    { title: 'Products', href: '/products', icon: <LayoutGridIcon size={24} />, isNavLink: true },
    { title: 'About Us', href: '/about', icon: <InfoIcon size={24} />, isNavLink: true },
    { title: 'Contact', href: '/contact', icon: <MailIcon size={24} />, isNavLink: true },
    { title: 'Cart', href: '/cart', icon: <ShoppingCartIcon size={24} /> },
    { title: 'Blog', href: '/blog', icon: <RssIcon size={24} />, isNavLink: true },
  ];

  if (isLoading) {
    return <Preloader onLoaded={() => setIsLoading(false)} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans antialiased">
      {/* Modern Navbar - Only navigation component we need */}
      <Suspense fallback={<SimplePlaceholder />}>
        <Navbar cartItemCount={0} />
      </Suspense>
      
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onLoaded={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Conditionally render AnimatedDock only after loading is complete */}
      {!isLoading && (
         <AnimatedDock items={dockItems} />
      )}

      <main className={cn("flex-grow", !isLoading ? "mt-20" : "")}>
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading page...</div>}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/original" element={<OriginalProduct />} />
              <Route path="/products/vanilla" element={<VanillaProduct />} />
              <Route path="/products/berry" element={<BerryProduct />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/about" element={<AboutPage theme={theme as 'light' | 'dark'} />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/accounts" element={<AccountsPage />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Render FooterSection only after loading is complete */}
      {!isLoading && <FooterSection />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;