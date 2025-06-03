import { motion, MotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';

interface BrandIdentityProps {
  scrollProgress: MotionValue<number>;
  brandColor?: string;
}

export default function BrandIdentity({ scrollProgress, brandColor = '#e60000' }: BrandIdentityProps) {
  // Logo scale based on scroll progress
  const logoScale = 1 - (scrollProgress.get() * 0.1);
  
  return (
    <motion.div
      className="brand-identity"
      style={{ scale: logoScale, transformOrigin: 'left center' }}
    >
      <Link to="/" aria-label="Bogani Home">
        <svg 
          width="150" 
          height="50" 
          viewBox="0 0 150 50" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="brand-logo"
        >
          {/* Red B logo */}
          <path 
            d="M41.5 8H12C9.79086 8 8 9.79086 8 12V38C8 40.2091 9.79086 42 12 42H41.5C43.7091 42 45.5 40.2091 45.5 38V12C45.5 9.79086 43.7091 8 41.5 8Z" 
            fill={brandColor} 
          />
          
          {/* White B cutout */}
          <path 
            d="M25 15H17V35H25C29.9706 35 34 30.9706 34 26V24C34 19.0294 29.9706 15 25 15Z" 
            fill="white" 
          />
          
          {/* The slash */}
          <path 
            d="M48 15L56 35" 
            stroke={brandColor} 
            strokeWidth="2" 
            strokeLinecap="round" 
          />
          
          {/* Text */}
          <path 
            d="M60 28.5C60 24.3579 63.3579 21 67.5 21H75.5C79.6421 21 83 24.3579 83 28.5C83 32.6421 79.6421 36 75.5 36H67.5C63.3579 36 60 32.6421 60 28.5Z" 
            stroke={brandColor} 
            strokeWidth="2" 
          />
          
          <path 
            d="M87 21H95C99.1421 21 102.5 24.3579 102.5 28.5C102.5 32.6421 99.1421 36 95 36H87V21Z" 
            stroke={brandColor} 
            strokeWidth="2" 
          />
          
          <path 
            d="M107 21H116C119.866 21 123 24.134 123 28V28C123 31.866 119.866 35 116 35H107V21Z" 
            stroke={brandColor} 
            strokeWidth="2" 
          />
          
          <path 
            d="M128 21V36" 
            stroke={brandColor} 
            strokeWidth="2" 
            strokeLinecap="round" 
          />
          
          <path 
            d="M135 21V36" 
            stroke={brandColor} 
            strokeWidth="2" 
            strokeLinecap="round" 
          />
        </svg>
      </Link>
    </motion.div>
  );
}