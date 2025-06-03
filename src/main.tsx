import React, { lazy, Suspense } from 'react'; // React needed for StrictMode JSX
import ReactDOM from 'react-dom/client'; // Correct import
import './index.css'
import { CartProvider } from './context/CartContext';  // Adjust if necessary

// Use lazy loading for the main App component
const App = lazy(() => import('./App'));

// Loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primaryRed border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Loading Bogani...</p>
    </div>
  </div>
);

// Add type definitions for performance entries
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface FirstInputDelay extends PerformanceEntry {
  processingStart: number;
  startTime: number;
}

// Initialize performance monitoring
const reportWebVitals = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Use native PerformanceObserver if available
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Report to your analytics if needed
          // Use proper type checking to access entry properties
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          } else if (entry.entryType === 'first-input') {
            const firstInput = entry as FirstInputDelay;
            console.log('FID:', firstInput.processingStart - firstInput.startTime);
          } else if (entry.entryType === 'layout-shift') {
            console.log('CLS:', (entry as LayoutShift).value);
          }
        });
      });
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (e) {
      console.error('PerformanceObserver error:', e);
    }
  }
};

// Mount application
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CartProvider>
      <Suspense fallback={<LoadingFallback />}>
        <App />
      </Suspense>
    </CartProvider>
  </React.StrictMode>,
);

// Report web vitals
reportWebVitals();
