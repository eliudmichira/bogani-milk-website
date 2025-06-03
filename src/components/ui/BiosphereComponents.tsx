import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star, Sparkles, ArrowRight, Shield, Activity, Droplets } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

// Define types for data structures used in this file
interface SectionOptions extends IntersectionObserverInit {}

interface NucleusItemData {
  id: string;
  label: string;
  path: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

interface BiosphereParticlesProps {
  count?: number;
  className?: string;
}

// Custom hook for managing visible sections
export const useVisibleSections = (sectionIds: string[], options: SectionOptions = {}) => {
  const [visibleSections, setVisibleSections] = useState<{[key: string]: boolean}>({});
  
  useEffect(() => {
    const observersAndElements: { observer: IntersectionObserver; element: HTMLElement }[] = [];
    
    sectionIds.forEach((id: string) => {
      const element = document.getElementById(id);
      if (!element) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisibleSections(prev => ({
            ...prev,
            [id]: entry.isIntersecting
          }));
        },
        { threshold: 0.3, ...options }
      );
      
      observer.observe(element);
      observersAndElements.push({ observer, element });
    });
    
    return () => {
      observersAndElements.forEach(({ observer, element }) => {
        observer.unobserve(element);
      });
    };
  }, [sectionIds, options]);
  
  return visibleSections;
};

// Nucleus Navigation - Enhanced with accessibility
export const NucleusNavigation = memo(({ items }: { items: NucleusItemData[] }) => {
  return (
    <motion.nav 
      className="nucleus-navigation relative flex items-center justify-center py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      aria-label="Orbital navigation"
      role="navigation"
    >
      {items.map((item, index) => (
        <NucleusItem 
          key={item.id}
          label={item.label}
          path={item.path}
          index={index}
          total={items.length}
        />
      ))}
    </motion.nav>
  );
});

interface NucleusItemProps {
  label: string;
  path: string;
  index: number;
  total: number;
}

const NucleusItem = memo(({ label, path, index, total }: NucleusItemProps) => {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Calculate position around the circle
  const angle = (index / total) * Math.PI * 2;
  const radius = 160; // Base radius in pixels
  
  // Staggered animation for items to appear one after another
  const staggerDelay = 0.1 * index;
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      window.location.href = path;
    }
  }, [path]);
  
  return (
    <motion.div
      ref={ref}
      className="nucleus-item absolute"
      style={{
        left: `calc(50% + ${Math.cos(angle) * radius}px)`,
        top: `calc(50% + ${Math.sin(angle) * radius}px)`,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { 
        opacity: 1, 
        scale: hovered ? 1.2 : 1,
        transition: { delay: staggerDelay, duration: 0.5 }
      } : {}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.location.href = path}
      onKeyDown={(e) => handleKeyDown(e, index)}
      tabIndex={0}
      role="link"
      aria-label={`Navigate to ${label}`}
    >
      <div 
        className="nucleus-connector h-0.5 w-10 bg-gradient-to-r from-transparent to-primary absolute top-1/2 -translate-y-1/2 right-full"
        aria-hidden="true"
      />
      <motion.div 
        className="nucleus-node w-5 h-5 rounded-full cursor-pointer z-10 flex items-center justify-center"
        animate={{
          backgroundColor: hovered ? "var(--color-accent, #4CAF50)" : "var(--color-primary, #D50000)",
          boxShadow: hovered 
            ? "0 0 15px 5px rgba(255,255,255,0.3)" 
            : "0 0 5px 2px rgba(255,255,255,0.1)"
        }}
        aria-hidden="true"
      />
      <motion.span 
        className="nucleus-label absolute whitespace-nowrap left-full ml-2 text-sm font-medium"
        animate={{ 
          opacity: hovered ? 1 : 0.7,
          y: hovered ? -2 : 0
        }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
});

// ProductSphere - Enhanced with performance optimizations and better animations
export const ProductSphere = memo(() => {
  const [rotate, setRotate] = useState(0);
  const animationRef = useRef<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  // Use requestAnimationFrame for smoother animations
  useEffect(() => {
    if (!inView) return;
    
    let lastTime = 0;
    const animate = (time: number) => {
      if (lastTime === 0) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;
      
      // Adjust rotation speed based on delta time for consistent speed across devices
      setRotate(prev => (prev + 0.05 * (deltaTime / 16.67)) % 360);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [inView]);
  
  return (
    <div 
      ref={ref}
      className="product-sphere relative w-full max-w-md h-96 mx-auto overflow-hidden"
      role="presentation"
      aria-label="Interactive product sphere visualization"
    >
      {/* Outer glass sphere */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-lg border border-white/20"
        style={{ 
          boxShadow: '0 0 40px rgba(255,255,255,0.1), inset 0 0 30px rgba(255,255,255,0.05)',
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 70%)',
        }}
        animate={inView ? {
          boxShadow: [
            '0 0 40px rgba(255,255,255,0.1), inset 0 0 30px rgba(255,255,255,0.05)',
            '0 0 50px rgba(255,255,255,0.15), inset 0 0 40px rgba(255,255,255,0.1)',
            '0 0 40px rgba(255,255,255,0.1), inset 0 0 30px rgba(255,255,255,0.05)',
          ]
        } : {}}
        transition={{ duration: 3, repeat: Infinity }}
        aria-hidden="true"
      />
      
      {/* Inner content - products rotating */}
      <motion.div
        className="absolute w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ rotate: `${rotate}deg` }}
        aria-hidden="true"
      >
        {/* Product placeholders - using local API placeholders instead of external URLs */}
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32"
          whileHover={{ scale: 1.1 }}
        >
          <img 
            src="/api/placeholder/128/128" 
            alt="Product visualization" 
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32"
          whileHover={{ scale: 1.1 }}
        >
          <img 
            src="/api/placeholder/128/128" 
            alt="Product visualization" 
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </motion.div>
      </motion.div>
      
      {/* Ambient particles inside the sphere */}
      <BiosphereParticles count={20} />
      
      {/* Bioluminescent glow effect */}
      <div className="absolute inset-0 rounded-full bg-blue-400/10 blur-xl" aria-hidden="true" />
    </div>
  );
});

// Microbiome Journey - Enhanced with keyboard navigation and accessibility
export const MicrobiomeJourney = memo(() => {
  const [activeStage, setActiveStage] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const stages = [
    { id: 'day1', label: 'Day 1', description: 'Introduction of beneficial bacteria' },
    { id: 'week1', label: 'Week 1', description: 'Improved digestion begins' },
    { id: 'month1', label: 'Month 1', description: 'Enhanced immune response' },
    { id: 'ongoing', label: 'Ongoing', description: 'Maintained gut health balance' }
  ];
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setActiveStage(index);
    } else if (e.key === 'ArrowRight' && activeStage < stages.length - 1) {
      setActiveStage(prevStage => prevStage + 1);
    } else if (e.key === 'ArrowLeft' && activeStage > 0) {
      setActiveStage(prevStage => prevStage - 1);
    }
  }, [activeStage, stages.length]);
  
  return (
    <section 
      ref={ref}
      className="microbiome-journey py-12"
      aria-labelledby="journey-title"
    >
      <h2 id="journey-title" className="text-3xl font-bold text-center mb-12">Your Microbiome Journey</h2>
      
      <div 
        className="journey-timeline flex justify-between max-w-3xl mx-auto px-4 mb-16"
        role="tablist"
        aria-label="Microbiome journey timeline"
      >
        {stages.map((stage, index) => (
          <motion.div 
            key={stage.id}
            className={`timeline-node relative ${index === activeStage ? 'active' : ''}`}
            onClick={() => setActiveStage(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { 
              opacity: 1, 
              y: 0,
              transition: { delay: index * 0.1, duration: 0.5 }
            } : {}}
            tabIndex={0}
            role="tab"
            id={`tab-${stage.id}`}
            aria-selected={index === activeStage}
            aria-controls={`panel-${stage.id}`}
          >
            <motion.div 
              className="node-indicator w-5 h-5 rounded-full mx-auto mb-2"
              animate={{ 
                scale: index === activeStage ? [1, 1.2, 1] : 1,
                backgroundColor: index === activeStage 
                  ? 'var(--color-accent, #4CAF50)' 
                  : index < activeStage 
                    ? 'var(--color-primary, #D50000)' 
                    : '#e5e7eb'
              }}
              transition={{ 
                repeat: index === activeStage ? Infinity : 0,
                duration: 2
              }}
              aria-hidden="true"
            />
            <span className="node-label text-sm font-medium block text-center">{stage.label}</span>
            
            {index < stages.length - 1 && (
              <div 
                className={`connector absolute h-0.5 bg-gray-200 top-2.5 left-[calc(100%+0.5rem)] right-0 w-full ${index < activeStage ? 'bg-primary' : ''}`}
                aria-hidden="true"
              />
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="max-w-3xl mx-auto p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={stages[activeStage].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row gap-8"
            role="tabpanel"
            id={`panel-${stages[activeStage].id}`}
            aria-labelledby={`tab-${stages[activeStage].id}`}
          >
            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-bold mb-3">{stages[activeStage].label}</h3>
              <p className="text-gray-200">{stages[activeStage].description}</p>
              <ul className="mt-6 space-y-2" aria-label="Benefits">
                {['Improved gut flora diversity', 'Balanced microbiome', 'Enhanced nutrient absorption'].map((benefit, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex items-start gap-2"
                  >
                    <Sparkles className="w-5 h-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
              <BiomeVisualization stage={stages[activeStage].id} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
});

// BiomeVisualization - Enhanced with better animations and transitions
interface BiomeVisualizationProps {
  stage: string;
}

export const BiomeVisualization = memo(({ stage }: BiomeVisualizationProps) => {
  const icons = {
    day1: <Shield className="w-16 h-16" aria-hidden="true" />,
    week1: <Activity className="w-16 h-16" aria-hidden="true" />,
    month1: <Sparkles className="w-16 h-16" aria-hidden="true" />,
    ongoing: <Droplets className="w-16 h-16" aria-hidden="true" />
  };
  
  return (
    <motion.div 
      className="biome-visualization relative w-full h-full flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      role="img"
      aria-label={`Visualization for the ${stage} stage`}
    >
      <div className="absolute inset-0" aria-hidden="true">
        <BiosphereParticles count={40} />
      </div>
      <motion.div 
        className="relative z-10 text-accent p-4 bg-white/10 rounded-full"
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 0.95, 1]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      >
        {stage === 'day1' && icons.day1}
        {stage === 'week1' && icons.week1}
        {stage === 'month1' && icons.month1}
        {stage === 'ongoing' && icons.ongoing}
      </motion.div>
    </motion.div>
  );
});

// GlassmorphicCard - Enhanced with responsive design and better hover states
interface GlassmorphicCardProps {
  product: any; // Use a more specific type if available, using any for now
}

export const GlassmorphicCard = memo(({ product }: GlassmorphicCardProps) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setClicked(!clicked);
    }
  }, [clicked]);
  
  return (
    <motion.div
      ref={ref}
      className="glass-card relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product?.name || 'product'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? {
        opacity: 1,
        y: 0,
        scale: clicked ? 1.05 : 1,
        boxShadow: hovered 
          ? "0 20px 30px rgba(0, 0, 0, 0.2)" 
          : "0 10px 20px rgba(0, 0, 0, 0.15)"
      } : {}}
      transition={{ duration: 0.3 }}
    >
      <div className="card-content relative z-10">
        <motion.div 
          className="product-image-container mb-4"
          animate={{
            rotateY: hovered ? 15 : 0,
            rotateX: hovered ? -10 : 0
          }}
        >
          {/* Using placeholder API instead of external URL */}
          <img 
            src={product?.image || "/api/placeholder/180/180"} 
            alt={product?.name || "Product"} 
            className="product-image w-48 h-48 mx-auto object-contain drop-shadow-lg" 
          />
        </motion.div>
        
        <h3 className="product-name text-xl font-bold mb-2">{product?.name || "Product Name"}</h3>
        <p className="product-tagline text-sm text-gray-200 mb-4">{product?.description || "Product description goes here"}</p>
        
        <motion.button
          className="explore-button px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Explore ${product?.name || 'product'}`}
        >
          <span className="flex items-center gap-2">
            Explore <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </span>
        </motion.button>
      </div>
      
      <BiosphereParticles count={15} className="absolute inset-0 pointer-events-none" />
    </motion.div>
  );
});

// BiosphereParticles - Enhanced with better performance
export const BiosphereParticles = memo(({ count = 20, className = "" }: BiosphereParticlesProps) => {
  // Generate particles only once instead of on every render
  const particles = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 8 + 2,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 2,
      xMovement: Math.random() * 30 - 15,
      yMovement: Math.random() * 30 - 15,
    }));
  }, [count]);
  
  return (
    <div className={`biosphere-particles ${className}`} aria-hidden="true">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/30"
          style={{
            width: particle.size + 'px',
            height: particle.size + 'px',
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            x: [0, particle.xMovement, 0],
            y: [0, particle.yMovement, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
});

// FluidGradient - Enhanced with reduced motion preference detection
export const FluidGradient = memo(() => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div 
        className="fluid-gradient absolute w-3/5 h-3/5 top-1/5 left-1/5 rounded-full opacity-40 mix-blend-overlay"
        style={{
          background: `conic-gradient(
            from 180deg at 50% 50%,
            #D50000 0deg,
            #9C27B0 72deg,
            #4FC1E9 144deg,
            #4CAF50 216deg,
            #F2EA7E 288deg,
            #D50000 360deg
          )`,
          filter: 'blur(40px)',
        }}
        animate={!prefersReducedMotion ? {
          rotate: [0, 360],
          scale: [0.7, 0.9, 0.7],
          opacity: [0.3, 0.5, 0.3],
        } : {}}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, repeatType: "reverse" },
          opacity: { duration: 8, repeat: Infinity, repeatType: "reverse" },
        }}
      />
      
      <motion.div 
        className="fluid-gradient absolute w-4/5 h-4/5 top-1/10 left-1/10 rounded-full opacity-30 mix-blend-color-dodge"
        style={{
          background: `conic-gradient(
            from 0deg at 50% 50%,
            #4FC1E9 0deg,
            #4CAF50 72deg,
            #F2EA7E 144deg,
            #D50000 216deg,
            #9C27B0 288deg,
            #4FC1E9 360deg
          )`,
          filter: 'blur(60px)',
        }}
        animate={!prefersReducedMotion ? {
          rotate: [0, -360],
          scale: [0.8, 1, 0.8],
        } : {}}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, repeatType: "reverse" },
        }}
      />
      
      <motion.div 
        className="fluid-gradient absolute w-9/10 h-9/10 top-1/20 left-1/20 rounded-full opacity-20"
        style={{
          background: `radial-gradient(
            circle at 50% 50%,
            rgba(79, 193, 233, 0.8) 0%,
            rgba(79, 193, 233, 0) 70%
          )`,
          filter: 'blur(30px)',
        }}
        animate={!prefersReducedMotion ? {
          x: ['-5%', '5%', '-5%'],
          y: ['-5%', '5%', '-5%'],
        } : {}}
        transition={{
          duration: 10, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </div>
  );
});

// TestimonialOrganisms - Enhanced with keyboard navigation and pause on hover

export const TestimonialOrganisms = memo(({ testimonials }: { testimonials: Testimonial[] }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });
  
  // Setup auto-rotation with pause on hover
  useEffect(() => {
    if (!inView || isHovered || !testimonials?.length) return;
    
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials, isHovered, inView]);
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setActiveTestimonial(index);
    } else if (e.key === 'ArrowRight') {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    } else if (e.key === 'ArrowLeft') {
      setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
    }
  }, [testimonials]);
  
  // Handle case where testimonials might be empty
  if (!testimonials?.length) {
    return null;
  }
  
  return (
    <div 
      ref={ref}
      className="testimonial-organisms relative max-w-3xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Customer testimonials"
      aria-roledescription="carousel"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5 rounded-3xl" aria-hidden="true"></div>
      <BiosphereParticles count={30} className="absolute inset-0" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTestimonial}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="p-8 text-center"
          role="group"
          aria-roledescription="slide"
          aria-label={`Testimonial ${activeTestimonial + 1} of ${testimonials.length}`}
        >
          <div className="mb-6" aria-label={`Rating: ${testimonials[activeTestimonial]?.rating || 5} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={`inline-block w-6 h-6 mx-1 ${i < (testimonials[activeTestimonial]?.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                aria-hidden="true"
              />
            ))}
          </div>
          
          <p className="text-xl mb-6 italic">"{testimonials[activeTestimonial]?.quote || 'Great product!'}"</p>
          
          <div className="flex items-center justify-center gap-4">
            <img 
              src={testimonials[activeTestimonial]?.image || "/api/placeholder/48/48"} 
              alt="" 
              className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
              aria-hidden="true"
            />
            <div className="text-left">
              <p className="font-bold">{testimonials[activeTestimonial]?.name || 'Customer'}</p>
              <p className="text-sm text-gray-400">{testimonials[activeTestimonial]?.role || 'Verified User'}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div 
        className="flex justify-center gap-2 mt-6"
        role="tablist"
        aria-label="Testimonial navigation"
      >
        {testimonials.map((_, i) => (
          <button 
            key={i}
            onClick={() => setActiveTestimonial(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`w-3 h-3 rounded-full transition-colors ${activeTestimonial === i ? 'bg-accent' : 'bg-white/20'}`}
            role="tab"
            tabIndex={0}
            aria-selected={activeTestimonial === i}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
});

// Styling as CSS module or styled-components pattern
export const BiosphereStyles = `
:root {
  /* Primary palette - Biomorphic colors */
  --color-primary: #D50000; /* Yogurt red */
  --color-primary-dark: #B71C1C; /* Darker red for dark mode */
  --color-secondary: #4FC1E9; /* Bioluminescent blue */
  --color-secondary-dark: #0288D1; /* Darker blue for dark mode */
  --color-accent: #4CAF50; /* Probiotic green */
  --color-accent-dark: #2E7D32; /* Darker green for dark mode */
  --color-tertiary: #9C27B0; /* Berry purple */
  --color-tertiary-dark: #7B1FA2; /* Darker purple for dark mode */
  --color-highlight: #F2EA7E; /* Cream yellow */
  --color-highlight-dark: #D4B92B; /* Darker yellow for dark mode */
  
  /* Functional colors */
  --color-background: #FFFFFF; /* Light background */
  --color-background-dark: #121A29; /* Deep space blue for dark mode */
  --color-surface: rgba(255, 255, 255, 0.05);
  --color-surface-dark: rgba(18, 26, 41, 0.3);
  --color-on-surface: rgba(0, 0, 0, 0.87);
  --color-on-surface-dark: rgba(255, 255, 255, 0.87);
  --color-inactive: rgba(0, 0, 0, 0.3);
  --color-inactive-dark: rgba(255, 255, 255, 0.3);
  --color-completed: var(--color-accent);
  --color-completed-dark: var(--color-accent-dark);
}

/* Media query for dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: var(--color-primary-dark);
    --color-secondary: var(--color-secondary-dark);
    --color-accent: var(--color-accent-dark);
    --color-tertiary: var(--color-tertiary-dark);
    --color-highlight: var(--color-highlight-dark);
    --color-background: var(--color-background-dark);
    --color-surface: var(--color-surface-dark);
    --color-on-surface: var(--color-on-surface-dark);
    --color-inactive: var(--color-inactive-dark);
    --color-completed: var(--color-completed-dark);
  }
}

.dark {
  --color-primary: var(--color-primary-dark);
  --color-secondary: var(--color-secondary-dark);
  --color-accent: var(--color-accent-dark);
  --color-tertiary: var(--color-tertiary-dark);
  --color-highlight: var(--color-highlight-dark);
  --color-background: var(--color-background-dark);
  --color-surface: var(--color-surface-dark);
  --color-on-surface: var(--color-on-surface-dark);
  --color-inactive: var(--color-inactive-dark);
  --color-completed: var(--color-completed-dark);
}

/* Color themes based on product flavors */
.theme-strawberry {
  --product-color: var(--color-primary);
  --product-glow: rgba(213, 0, 0, 0.2);
}

.theme-vanilla {
  --product-color: var(--color-highlight);
  --product-glow: rgba(242, 234, 126, 0.2);
}

.theme-berry {
  --product-color: var(--color-tertiary);
  --product-glow: rgba(156, 39, 176, 0.2);
}

/* Responsive design adjustments */
@media (max-width: 768px) {
  .nucleus-navigation {
    height: 160px;
  }
  
  .product-sphere {
    max-width: 300px;
    height: 300px;
  }
}

@media (max-width: 640px) {
  .microbiome-journey .journey-timeline {
    overflow-x: auto;
    padding-bottom: 1rem;
  }
  
  .glass-card {
    padding: 1.5rem;
  }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .nucleus-item,
  .product-sphere,
  .biome-visualization,
  .glass-card,
  .biosphere-particles,
  .fluid-gradient,
  .testimonial-organisms {
    transition: none !important;
    animation: none !important;
  }
}

.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 
    0 4px 30px rgba(0, 0, 0, 0.1),
    inset 0 0 1px 1px rgba(255, 255, 255, 0.1);
}

.dark .glass-card {
  background: rgba(18, 26, 41, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 4px 30px rgba(0, 0, 0, 0.3),
    inset 0 0 1px 1px rgba(255, 255, 255, 0.05);
}

.nucleus-navigation {
  width: 100%;
  height: 200px;
  position: relative;
  margin-bottom: 40px;
}

.nucleus-item:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
  border-radius: 8px;
}

.microbiome-journey .journey-timeline {
  position: relative;
}

.microbiome-journey .connector {
  right: calc(-50% - 0.5rem);
  width: calc(100% + 1rem);
}

.microbiome-journey .timeline-node:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
  border-radius: 8px;
}

.product-sphere {
  perspective: 1000px;
}

.biosphere-particles {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;
}

.glass-card:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

.testimonial-organisms button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.display-text {
  font-size: clamp(2.8rem, 3.5vw, 4rem);
  font-weight: 700;
  background: linear-gradient(
    to right,
    var(--color-primary),
    var(--color-tertiary),
    var(--color-accent)
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1;
  letter-spacing: -0.02em;
}

.dark .display-text {
  background: linear-gradient(
    to right,
    var(--color-highlight),
    var(--color-secondary),
    var(--color-accent)
  );
  -webkit-background-clip: text;
  background-clip: text;
}

/* Skip to content link for accessibility */
.skip-to-content {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: 8px;
  z-index: 100;
  transition: top 0.3s;
}

.skip-to-content:focus {
  top: 0;
}
`;

// Export a custom hook for theme toggling
export const useThemeToggle = (initialTheme = 'light') => {
  const [theme, setTheme] = useState(initialTheme);
  
  useEffect(() => {
    // Check for system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const systemTheme = mediaQuery.matches ? 'dark' : 'light';
    
    // Get saved preference or use system theme
    const savedTheme = localStorage.getItem('biosphere-theme');
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    
    // Listen for system changes
    const handleChange = () => {
      if (!localStorage.getItem('biosphere-theme')) {
        const newTheme = mediaQuery.matches ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('biosphere-theme', newTheme);
  }, [theme]);
  
  return { theme, toggleTheme };
};