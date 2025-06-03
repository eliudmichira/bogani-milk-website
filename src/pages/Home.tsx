import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Removed useScroll, useTransform, useSpring
import { 
  Heart, 
  ChevronRight, 
  Instagram, 
  Sparkles, 
  ShieldCheck, 
  Activity,
  Check,
  Droplets,
  ArrowDown,
  ShoppingBag,
  Sun,
  Moon,
  Clock,
  MapPin,
  Phone,
  Mail,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Menu,
  X,
  ArrowRight,
  Leaf,
  ExternalLink,
  Star,
  Users,
  Brain,
  Shield,
  Plus
} from "lucide-react";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend,
  ResponsiveContainer 
} from "recharts";
import HealthBenefitsTimeline from "../components/HealthBenefitsTimeline";

// Import images
import brandYogurt from "../assets/brand yorughut.jpg";
import image1 from "../assets/IMG-20250512-WA0001.jpg";
import berryRedCup from "../assets/berry red cup image.jpg";
import billboardAdvert from "../assets/billboard advert.jpg";
import boganiProfile from "../assets/bogani  profile with order now  number.jpg";
import allBottles from "../assets/bogani big  all bottles picture with flavours.jpg";
import inStores from "../assets/bogani in super markets and shops.jpg";
import kidsWithBogani from "../assets/kids with bogani big bottles.jpg";
import redCupWithStrawberries from "../assets/red cup with strawberries beside it.jpg";
import strawberryCup from "../assets/strawberry cup woth arms marketing image.png";
import vanillaImg from "../assets/vanilla.jpg";

// Define replacement variables for the missing images
const image2 = berryRedCup;
const image3 = billboardAdvert;
const image4 = boganiProfile;
const image5 = allBottles;
const image6 = inStores;
const image8 = kidsWithBogani;

// Custom biosphere components
const BiosphereStyles = `
  /* Biosphere Ecosystem Styles */
  .biosphere-ecosystem {
    position: relative;
    overflow-x: hidden;
  }
  
  /* Organic shapes */
  .organic-blob {
    border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%;
    filter: blur(40px);
    opacity: 0.6;
    z-index: 0;
  }
  
  .microorganism {
    position: relative;
    transition: all 0.5s ease;
  }
  
  .microorganism:hover {
    transform: scale(1.05);
  }
  
  .probiotic-particle {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), transparent);
    animation: float 8s infinite ease-in-out;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    25% { transform: translateY(-10px) rotate(5deg); }
    50% { transform: translateY(5px) rotate(-3deg); }
    75% { transform: translateY(-5px) rotate(1deg); }
  }

  .ecosystem-grid {
    display: grid;
    position: relative;
    z-index: 1;
  }
  
  .fluid-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    overflow: hidden;
    z-index: 0;
  }
  
  .fluid-gradient::before,
  .fluid-gradient::after {
    content: '';
    position: absolute;
    width: 300%;
    height: 300%;
    top: -100%;
    left: -100%;
    background: radial-gradient(circle at center, rgba(165, 214, 167, 0.4) 0%, rgba(129, 199, 132, 0.2) 30%, rgba(0, 0, 0, 0) 70%);
    animation: rotate 60s linear infinite;
  }
  
  .fluid-gradient::after {
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background: radial-gradient(circle at center, rgba(100, 223, 223, 0.3) 0%, rgba(29, 233, 182, 0.1) 40%, rgba(0, 0, 0, 0) 70%);
    animation: rotate 40s linear infinite reverse;
  }
  
  .dark .fluid-gradient::before {
    background: radial-gradient(circle at center, rgba(79, 209, 197, 0.3) 0%, rgba(72, 187, 177, 0.1) 30%, rgba(0, 0, 0, 0) 70%);
  }
  
  .dark .fluid-gradient::after {
    background: radial-gradient(circle at center, rgba(72, 187, 177, 0.2) 0%, rgba(79, 209, 197, 0.1) 40%, rgba(0, 0, 0, 0) 70%);
  }
  
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .glass-card {
    position: relative;
    backdrop-filter: blur(8px);
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    overflow: hidden;
  }
  
  .dark .glass-card {
    background-color: rgba(30, 41, 59, 0.6);
    border: 1px solid rgba(30, 41, 59, 0.3);
  }
  
  .glass-card:hover {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .dark .glass-card:hover {
    border: 1px solid rgba(79, 209, 197, 0.3);
  }
  
  /* Microbiome journey visualization */
  .microbiome-journey {
    position: relative;
    height: 400px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .microbiome-node {
    position: absolute;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background: white;
    z-index: 2;
    transition: all 0.3s ease;
  }
  
  .dark .microbiome-node {
    background: rgba(30, 41, 59, 0.8);
  }
  
  .microbiome-node:hover {
    transform: scale(1.1);
    z-index: 3;
  }
  
  .microbiome-path {
    position: absolute;
    overflow: visible;
    stroke-dasharray: 10;
    stroke-dashoffset: 1000;
    animation: draw 3s forwards ease-in-out;
  }
  
  /* Hide the duplicate header in Home page */
  #root > div > header:nth-child(2) {
    display: none !important;
  }
  
  /* Add padding to account for the global navbar */
  main {
    padding-top: 0;
  }
  
  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }
  
  /* Product sphere styles */
  .product-sphere {
    position: relative;
    width: 100%;
    height: 400px;
    perspective: 800px;
  }
  
  .sphere-container {
    position: absolute;
    width: 300px;
    height: 300px;
    left: 50%;
    top: 50%;
    transform-style: preserve-3d;
    transform: translate(-50%, -50%);
    animation: rotateSphere 30s infinite linear;
  }
  
  .sphere-item {
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transform-style: preserve-3d;
    will-change: transform;
    transition: transform 0.3s ease;
  }
  
  .dark .sphere-item {
    background: rgba(30, 41, 59, 0.8);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  
  .sphere-item:hover {
    transform: scale(1.2) translateZ(30px);
    z-index: 10;
  }
  
  @keyframes rotateSphere {
    0% { transform: translate(-50%, -50%) rotateY(0) rotateX(10deg); }
    100% { transform: translate(-50%, -50%) rotateY(360deg) rotateX(10deg); }
  }
`;

// FluidGradient Component
const FluidGradient = () => {
  return <div className="fluid-gradient" aria-hidden="true"></div>;
};

// ProductSphere Component 
const ProductSphere = () => {
  const sphereRef = useRef(null);
  
  // Define interface for sphere items
  interface SphereItem {
    id: number;
    transform: string;
    icon: string;
  }

  const [sphereItems, setSphereItems] = useState<SphereItem[]>([]); // Use SphereItem[] type
  
  useEffect(() => {
    // Generate sphere positions
    const itemCount = 12;
    const radius = 120;
    const items = [];
    
    for (let i = 0; i < itemCount; i++) {
      // Calculate positions on a sphere
      const phi = Math.acos(-1 + (2 * i) / itemCount);
      const theta = Math.sqrt(itemCount * Math.PI) * phi;
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      items.push({
        id: i,
        transform: `translateX(${x}px) translateY(${y}px) translateZ(${z}px)`,
        icon: i % 4 === 0 ? "ShieldCheck" : 
              i % 4 === 1 ? "Droplets" : 
              i % 4 === 2 ? "Activity" : "Sparkles"
      });
    }
    
    setSphereItems(items);
  }, []);
  
  return (
    <div className="product-sphere" aria-hidden="true">
      <motion.div 
        className="sphere-container"
        ref={sphereRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {sphereItems.map(item => (
          <motion.div
            key={item.id}
            className="sphere-item"
            style={{ transform: item.transform }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: item.id * 0.1 }}
          >
            {item.icon === "ShieldCheck" && <ShieldCheck className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />}
            {item.icon === "Activity" && <Activity className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />}
            {item.icon === "Droplets" && <Droplets className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />}
            {item.icon === "Sparkles" && <Sparkles className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// TestimonialOrganisms Component
const TestimonialOrganisms = () => {
  return (
    <div className="relative h-full overflow-visible">
      {/* Background microorganisms */}
      <div className="absolute -z-10 inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="probiotic-particle absolute"
            style={{
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: `rgba(16, 185, 129, ${Math.random() * 0.1 + 0.05})`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`
            }}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
              rotate: [0, Math.random() * 360],
              scale: [1, Math.random() * 0.5 + 0.8, 1]
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
      
      {/* Organic blob backgrounds */}
      <div className="absolute -z-20 top-1/4 left-1/4 w-1/2 h-1/2 organic-blob" 
        style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 70%)' }}
      ></div>
      <div className="absolute -z-20 bottom-1/4 right-1/4 w-2/5 h-2/5 organic-blob" 
        style={{ background: 'radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(14, 165, 233, 0.05) 70%)' }}
      ></div>

      {/* Active testimonial is rendered by parent component */}
    </div>
  );
};

// Type definitions
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  isVisible?: boolean;
  highlightWord?: string;
  className?: string;
  style?: React.CSSProperties;
}

interface RecipeCardProps {
  recipe: Recipe; // Ensuring Recipe is defined below
  isVisible?: boolean;
}

interface Product {
  name: string;
  description: string;
  image: string;
  price: number;
  icon?: string;      // Optional icon
  tags?: string[];    // Optional tags array
  isNew?: boolean;    // Whether the product is new
  benefits?: string[]; // Product health benefits
  [key: string]: any; // Allow other properties if any
}

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
}

interface Testimonial {
  name: string;
  title: string;
  quote: string;
  image: string;
  rating: number;
}

interface Recipe { // Definition for Recipe
  title: string;
  description: string;
  image: string;
  prepTime: string;
  category: string;
  difficulty: string;
}

interface InstagramPost {
  id: number;
  image: string;
  likes: number;
  caption: string;
}

// Sample data
const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    title: "Fitness Instructor",
    quote: "Bogani yogurt has been a game-changer for my digestive health. I've tried many probiotics, but nothing compares to the natural benefits I get from this delicious yogurt!",
    image: image1,
    rating: 5
  },
  {
    name: "Michael Chen",
    title: "Nutrition Coach",
    quote: "I recommend Bogani to all my clients. It's not just the probiotics that make it special, but the clean ingredients and authentic flavors that make it a perfect addition to any healthy diet.",
    image: image2,
    rating: 5
  },
  {
    name: "Amina Patel",
    title: "Yoga Instructor",
    quote: "Since adding Bogani to my morning routine, I've noticed significant improvements in my energy levels and overall gut health. It's now an essential part of my wellness journey.",
    image: image3,
    rating: 5
  }
];

const products: Product[] = [
  {
    name: "Classic Natural",
    description: "Our signature plain yogurt, rich in probiotics with a creamy texture and tangy flavor.",
    image: image1,
    price: 220.00,
    tags: ["No Sugar Added", "High Protein", "Probiotic"],
    isNew: false,
    benefits: ["Digestive Health", "High Protein", "No Added Sugar"]
  },
  {
    name: "Wild Berry Blend",
    description: "A delicious mix of strawberries, blueberries, and blackberries with our probiotic yogurt.",
    image: image2,
    price: 250.00,
    tags: ["Natural Flavors", "Low Sugar", "Antioxidants"],
    isNew: true,
    benefits: ["Rich in Vitamin C", "Real Fruit", "No Artificial Colors"]
  },
  {
    name: "Tropical Mango",
    description: "Sweet, juicy mangoes blended with our creamy probiotic yogurt for a taste of the tropics.",
    image: image3,
    price: 250.00,
    tags: ["Vitamin C", "Natural Flavors", "Digestive Health"],
    isNew: false,
    benefits: ["Immune Support", "Rich in Vitamins", "Gut Friendly"]
  },
  {
    name: "Greek Style Protein+",
    description: "High-protein Greek style yogurt perfect for fitness enthusiasts and active lifestyles.",
    image: vanillaImg,
    price: 280.00,
    tags: ["High Protein", "Low Fat"],
    isNew: false,
    benefits: ["20g Protein", "Muscle Recovery", "Satiating"]
  }
];

const recipes: Recipe[] = [
  {
    title: "Berry Breakfast Bowl",
    description: "Start your day with our protein-packed yogurt bowl topped with fresh berries, honey, and granola.",
    image: image4,
    prepTime: "5 min",
    category: "Breakfast",
    difficulty: "Easy"
  },
  {
    title: "Cucumber Yogurt Dip",
    description: "A refreshing tzatziki-inspired dip perfect for vegetables, pita bread, or as a sauce for grilled meats.",
    image: image5,
    prepTime: "10 min",
    category: "Appetizer",
    difficulty: "Easy"
  },
  {
    title: "Mango Lassi Smoothie",
    description: "A tropical smoothie made with our yogurt, fresh mango, and a hint of cardamom for an energy boost.",
    image: image6,
    prepTime: "7 min",
    category: "Beverage",
    difficulty: "Easy"
  }
];

const instagramPosts: InstagramPost[] = [
  {
    id: 1,
    image: image4,
    likes: 245,
    caption: "Start your morning right with our protein-packed Bogani yogurt! #HealthyBreakfast #BoganiYogurt"
  },
  {
    id: 2,
    image: image5,
    likes: 182,
    caption: "Behind the scenes at our farm where we source the freshest ingredients for your favorite yogurt!"
  },
  {
    id: 3,
    image: image6,
    likes: 312,
    caption: "Our new Wild Berry flavor is here! Have you tried it yet? #NewFlavor #BoganiLove"
  },
  {
    id: 4,
    image: image8,
    likes: 276,
    caption: "The perfect afternoon snack that's both delicious and good for your gut health! #HealthySnacking"
  }
];

const blogPosts: BlogPost[] = [
  {
    title: "The Science Behind Probiotics",
    excerpt: "Discover how beneficial bacteria support your digestive system and overall health.",
    image: image1,
    category: "Health",
    readTime: "5 min"
  },
  {
    title: "5 Delicious Ways to Enjoy Yogurt",
    excerpt: "Creative recipes that transform your daily yogurt into exciting culinary experiences.",
    image: image2,
    category: "Recipes",
    readTime: "4 min"
  },
  {
    title: "Gut Health and Immunity Connection",
    excerpt: "How a healthy gut microbiome strengthens your immune system against common illnesses.",
    image: image3,
    category: "Wellness",
    readTime: "6 min"
  }
];

const healthBenefits = [
  {
    title: "Gut Health",
    description: "Our proprietary blend of probiotics helps maintain a healthy gut microbiome, supporting digestion and nutrient absorption.",
    icon: "ShieldCheck"
  },
  {
    title: "Immune Support",
    description: "A healthy gut plays a crucial role in immune function. Our yogurt provides beneficial bacteria that support your body's natural defenses.",
    icon: "Activity"
  },
  {
    title: "Digestive Balance",
    description: "Regular consumption of our probiotic yogurt may help reduce bloating, gas, and other digestive discomforts.",
    icon: "Droplets"
  },
  {
    title: "Nutrient Rich",
    description: "Packed with protein, calcium, and essential vitamins, our yogurt provides comprehensive nutritional benefits in every serving.",
    icon: "Sparkles"
  }
];

// Stats for counter section
const statsData = [
  { value: 20000, label: "Happy Customers", suffix: "+" },
  { value: 5, label: "Delicious Flavors", suffix: "" },
  { value: 100, label: "Local Farmers Supported", suffix: "+" },
  { value: 1.5, label: "Million Liters Produced", suffix: "M+" }
];

// Custom hooks
const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    const savedTheme = localStorage?.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
        localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);
  
  return { theme, toggleTheme };
};

const useCart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  
  const addToCart = useCallback((product: Product) => {
    setCartItems(prev => [...prev, product]);
  }, []);
  
  return { cartItems, addToCart };
};

// Custom hook for section visibility
const useVisibleSections = () => { // Removed unused sectionIds parameter
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      if (entry.isIntersecting) {
        setVisibleSections(prev => prev.includes(id) ? prev : [...prev, id]);
        } else {
        setVisibleSections(prev => prev.filter(sectId => sectId !== id));
      }
    });
  }, []);
  
  const registerSection = useCallback((id: string, ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.2,
        rootMargin: '-10% 0px -10% 0px'
      });
      observer.observe(ref.current);
      
      return () => {
        if (ref.current) observer.unobserve(ref.current); // Check ref.current before unobserve
      };
    }
  }, [observerCallback]);
  
  return { visibleSections, registerSection };
};

// Helper components
const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  title, 
  subtitle, 
  isVisible = true, 
  highlightWord = "", 
  className = "", 
  style = {} 
}) => {
  const words = title.split(' ');
  const highlightedTitle = highlightWord 
    ? words.map((word: string) => 
        word === highlightWord || highlightWord.includes(word) 
          ? `<span class="highlight">${word}</span>` 
          : word
      ).join(' ') 
    : title;

  return (
    <div className={`mb-12 ${className}`}>
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6 }}
        style={style}
        dangerouslySetInnerHTML={{ __html: highlightedTitle }}
      />
      {subtitle && (
        <motion.p 
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isVisible = true }) => {
  return (
    <motion.div 
      className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 h-full transform transition-transform"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          {recipe.category}
      </div>
    </div>
      <div className="p-5 flex flex-col h-[calc(100%-12rem)]">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <Clock className="w-3 h-3 mr-1" /> {recipe.prepTime}
          </span>
          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
            {recipe.difficulty}
          </span>
  </div>
        <h3 className="text-xl font-bold mb-2 text-emerald-700 dark:text-emerald-400">{recipe.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">{recipe.description}</p>
        <a href="#" className="text-emerald-600 dark:text-emerald-400 font-medium text-sm mt-auto inline-flex items-center hover:text-emerald-700 dark:hover:text-emerald-300">
          View Recipe <ChevronRight className="w-4 h-4 ml-1" />
        </a>
      </div>
    </motion.div>
  );
};

// Main component
  const Home = () => {
  // const { theme, toggleTheme } = useTheme(); // REMOVE THIS LINE
  // const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart(); // REMOVE THIS LINE
  // const visibleSections = useVisibleSections(); // REMOVE THIS LINE
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // REMOVE THIS LINE

  // Ref for the hero section to use for intersection observer
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroInView, setHeroInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry.isIntersecting);
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // Refs for sections 
    const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    benefits: useRef<HTMLElement>(null),
    features: useRef<HTMLElement>(null),
    products: useRef<HTMLElement>(null),
    testimonials: useRef<HTMLElement>(null),
    recipes: useRef<HTMLElement>(null),
    blog: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
    instagram: useRef<HTMLElement>(null),
    subscribe: useRef<HTMLElement>(null)
  };

  // Custom hooks
const { visibleSections, registerSection } = useVisibleSections();
  const { theme, toggleTheme } = useTheme();
  const { cartItems, addToCart } = useCart();

  // State management
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  // Register sections with the visibility system
  useEffect(() => {
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      registerSection(key, ref);
    });
  }, [registerSection]);

  // Simulate loading state for products
  useEffect(() => {
      setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Testimonial auto-rotation
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [activeTestimonial]);

  // Handle subscription form
  const handleSubscribe = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (subscribeEmail) {
      setIsSubscribed(true);
      // In a real app, you would send this to your API
      console.log("Subscribed with:", subscribeEmail);
    }
  }, [subscribeEmail]);

  // Handle contact form
  const handleContactSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your API
    console.log("Contact form submitted:", formData);
    
    // Clear form
    setFormData({
      name: "",
      email: "",
      message: ""
    });
    
    // Show success message
    alert("Thank you for your message! We'll get back to you soon.");
  }, [formData]);

  // Handle contact form input changes
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  }, []);

    // Scroll to section function
  const scrollToSection = useCallback((ref: React.RefObject<HTMLElement | null>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
    }
  }, []);

    // Benefits chart data for recharts
    const benefitsData = [
      {
        subject: 'Gut Health',
        A: 90,
        fullMark: 100,
      },
      {
        subject: 'Immunity',
        A: 85,
        fullMark: 100,
      },
      {
        subject: 'Digestion',
        A: 95,
        fullMark: 100,
      },
      {
        subject: 'Nutrient Absorption',
        A: 80,
        fullMark: 100,
      },
      {
        subject: 'Overall Wellness',
        A: 88,
        fullMark: 100,
      },
    ];

    // Product skeleton loader
    const ProductSkeleton = () => (
      <div className="rounded-lg bg-white dark:bg-gray-800 shadow-md p-4 h-full animate-pulse">
        <div className="rounded-full bg-gray-200 dark:bg-gray-700 w-12 h-12 mb-4"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
        <div className="flex gap-2 mb-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        </div>
        <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto my-4"></div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        </div>
      </div>
    );

    // Navigation items
    const navItems = [
      { name: "Home", ref: sectionRefs.hero },
      { name: "Benefits", ref: sectionRefs.benefits },
      { name: "Features", ref: sectionRefs.features },
      { name: "Products", ref: sectionRefs.products },
      { name: "Testimonials", ref: sectionRefs.testimonials },
      { name: "Contact", ref: sectionRefs.contact }
    ];

  return (
    <div className={`bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-screen flex flex-col ${theme}`}>
        {/* Include biosphere styles */}
      <style dangerouslySetInnerHTML={{ __html: BiosphereStyles }} />
      
      {/* Main content */}
      <main>
        {/* Hero Section */}
        <section 
          ref={sectionRefs.hero}
          id="hero"
          className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 z-0">
          <motion.div
              className="absolute top-20 right-20 w-96 h-96 rounded-full bg-yogurt-red/5 blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-accent-green/5 blur-3xl"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, -5, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
                
          {/* Content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
            <motion.div 
                  initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="mb-4"
                >
                  <span className="inline-block px-4 py-1 rounded-full bg-yogurt-red/10 text-yogurt-red font-medium text-sm">
                    Premium Probiotic Yogurt
                  </span>
        </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                >
                  <span className="text-yogurt-red">Nourish</span> Your Body,{" "}
                  <motion.span 
                    className="text-accent-green relative inline-block"
                    animate={{ 
                      y: [0, -5, 0],
                      rotateZ: [0, 2, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Naturally
                  </motion.span>
            </motion.h1>
            
            <motion.p
                  initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-lg"
            >
                  Experience Kenya's finest probiotic yogurt, crafted with care to support your gut health and overall wellbeing with every delicious spoonful.
            </motion.p>
            
            <motion.div
                  initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="flex flex-wrap gap-4"
                >
                  <a href="/products" className="px-8 py-4 rounded-xl bg-gradient-to-r from-yogurt-red to-berry text-white text-lg font-medium shadow-lg relative overflow-hidden group">
                    <motion.div 
                      className="absolute inset-0 bg-white opacity-20"
                      animate={{ 
                        x: ['-100%', '100%']
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Explore Our Products
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                    </span>
                  </a>
                  
                  <a href="/about" className="px-6 py-4 rounded-xl border-2 border-accent-green text-accent-green font-medium transition-colors hover:bg-accent-green/10 flex items-center gap-2">
                    Our Story
                    <ExternalLink size={16} />
                  </a>
            </motion.div>
              </motion.div>
                
              {/* Product Image */}
                  <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="relative"
              >
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-700 group">
                  <img 
                    src={brandYogurt} 
                    alt="Bogani Premium Yogurt" 
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                  />
                    
                    <motion.div 
                    className="absolute bottom-6 left-6 right-6 bg-white/80 dark:bg-gray-900/80 p-4 backdrop-blur-sm rounded-lg shadow-lg border border-white/40"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-yogurt-red/20 flex items-center justify-center">
                          <Heart size={14} className="text-yogurt-red" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-accent-green/20 flex items-center justify-center">
                          <Leaf size={14} className="text-accent-green" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <Droplets size={14} className="text-blue-500" />
                        </div>
                      </div>
                      <span className="text-gray-800 dark:text-white font-medium">Probiotic Health Benefits</span>
                    </div>
                    </motion.div>
                </div>
                
                <div className="absolute -bottom-10 -right-10 w-80 h-80 rounded-full bg-accent-green/10 -z-10"></div>
                <div className="absolute -top-10 -left-10 w-60 h-60 rounded-full bg-yogurt-red/10 -z-10"></div>
                  </motion.div>
          </div>
        </div>


      </section>

        {/* Our Story Section */}
      <section 
        ref={sectionRefs.benefits} 
        id="benefits" 
            className="py-20 bg-white dark:bg-gray-800 relative"
        aria-label="Benefits section"
      >
            <div className="container mx-auto px-4 relative z-10">
            <SectionHeading 
              title="The Bogani Difference" 
                subtitle="Discover what makes our probiotic yogurt unique and beneficial for your health."
              isVisible={visibleSections.includes('benefits')}
                highlightWord="Bogani"
              className="text-center"
                style={{ color: '#047857' }} // emerald-700
            />
            
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {healthBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                    className="glass-card p-6 text-center"
                    initial={{ opacity: 0, y: 30 }}
                  animate={visibleSections.includes('benefits') ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      {benefit.icon === "ShieldCheck" && <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />}
                      {benefit.icon === "Activity" && <Activity className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />}
                      {benefit.icon === "Droplets" && <Droplets className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />}
                      {benefit.icon === "Sparkles" && <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-emerald-700 dark:text-emerald-400">{benefit.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                </motion.div>
              ))}
              </div>
              
              {/* Microbiome Journey Visualization */}
              <div className="mt-20">
                <SectionHeading 
                  title="Your Microbiome Journey" 
                  subtitle="Follow the path of how Bogani probiotics work within your body to support wellness."
                  isVisible={visibleSections.includes('benefits')}
                  highlightWord="Microbiome"
                  className="text-center"
                  style={{ color: '#047857' }} // emerald-700
                />
                
                <div className="max-w-5xl mx-auto">
                <HealthBenefitsTimeline />
            </div>
          </div>
        </div>
      </section>

        {/* Features Section */}
      <section 
          ref={sectionRefs.features}
          id="features" 
          className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
      >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNEMzAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMC0xMmMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTEyIDEyYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMTIgMGMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bS0yNCAwYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMC0xMmMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTAgMTJjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyeiIvPjwvZz48L2c+PC9zdmc+')]"></div>
            
            <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-accent-green/10 text-accent-green font-medium text-sm mb-4">
                Why Choose Bogani
              </span>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">A Healthier You Starts from Within</h2>
              <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
                Our premium probiotic yogurt delivers delicious taste and essential health benefits in every spoonful.
              </p>
                  </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden border border-gray-100 dark:border-gray-700/30 h-full"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yogurt-red to-accent-green"></div>
                <div className="w-16 h-16 rounded-2xl bg-yogurt-red/10 flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-yogurt-red" />
                  </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Gut Health</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Our specially selected probiotic cultures promote digestive health and strengthen your immune system naturally.
                </p>
                <a href="/benefits" className="inline-flex items-center text-yogurt-red hover:text-berry transition-colors font-medium">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </motion.div>
              
              {/* Feature 2 */}
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden border border-gray-100 dark:border-gray-700/30 h-full"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-green to-yogurt-red"></div>
                <div className="w-16 h-16 rounded-2xl bg-accent-green/10 flex items-center justify-center mb-6">
                  <Leaf className="w-8 h-8 text-accent-green" />
                  </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Natural Ingredients</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Made with fresh milk from local Kenyan farms and natural flavors, without artificial preservatives or additives.
                </p>
                <a href="/ingredients" className="inline-flex items-center text-accent-green hover:text-green-700 transition-colors font-medium">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
                </motion.div>

              {/* Feature 3 */}
            <motion.div 
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden border border-gray-100 dark:border-gray-700/30 h-full"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-berry to-cream"></div>
                <div className="w-16 h-16 rounded-2xl bg-berry/10 flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-berry" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Community Impact</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Supporting local farmers and sustainable practices while investing in healthier Kenyan communities.
                </p>
                <a href="/community" className="inline-flex items-center text-berry hover:text-purple-700 transition-colors font-medium">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
                </motion.div>
          </div>
        </div>
      </section>

        {/* Product Showcase Section */}
      <section 
        ref={sectionRefs.products} 
        id="products" 
          className="py-24 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading 
              title="Our Premium Products" 
              subtitle="Discover our range of delicious probiotic yogurts made with the finest ingredients."
            isVisible={visibleSections.includes('products')}
              highlightWord="Premium"
            className="text-center"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {loading ? (
                // Show skeletons while loading
                Array(3).fill(0).map((_, index) => (
                  <ProductSkeleton key={index} />
                ))
              ) : (
                // Products display
                products.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product.name}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col h-full"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                    <div className="relative h-56 bg-gradient-to-r from-yogurt-red/10 to-accent-green/10 p-4 flex items-center justify-center">
                      <motion.div
                        animate={{ 
                          y: [0, -8, 0],
                          rotate: [0, 2, 0]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                        className="relative z-10"
                      >
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="h-48 object-contain" 
                        />
                      </motion.div>
                      
                      {product.tags && product.tags.length > 0 && (
                        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                          {product.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-white dark:bg-gray-900 text-xs font-medium rounded-full shadow-sm">
                              {tag}
                          </span>
                          ))}
                    </div>
                      )}
                      
                      {product.isNew && (
                        <div className="absolute top-3 right-3 bg-yogurt-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          NEW
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex-grow">
                      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.benefits && product.benefits.map((benefit: string) => (
                          <span key={benefit} className="inline-flex items-center px-2 py-1 text-xs bg-accent-green/10 text-accent-green rounded-full">
                            <Check className="w-3 h-3 mr-1" /> {benefit}
                          </span>
                        ))}
                      </div>
                      </div>
                      
                    <div className="p-6 pt-0 flex justify-between items-center border-t border-gray-100 dark:border-gray-700 mt-auto">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        KES {product.price.toFixed(2)}
                      </div>
                      <button 
                        className="px-4 py-2 bg-accent-green text-white rounded-xl hover:bg-accent-green/90 transition-colors flex items-center gap-2"
                          onClick={() => addToCart(product)}
                        >
                        <ShoppingBag className="w-4 h-4" />
                          Add to Cart
                      </button>
                  </div>
                </motion.div>
              ))
              )}
          </div>
          
            <div className="text-center mt-12">
              <a 
                href="/products" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow font-medium text-gray-900 dark:text-white"
              >
                View All Products
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
        </div>
      </section>

          {/* Testimonials Section */}
      <section 
        ref={sectionRefs.testimonials} 
        id="testimonials" 
          className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading 
            title="What Our Customers Say" 
              subtitle="Read what our customers love about Bogani probiotic yogurt."
            isVisible={visibleSections.includes('testimonials')}
              highlightWord="Customers"
            className="text-center"
              />
              
            <div className="max-w-4xl mx-auto mt-12 relative">
                  <TestimonialOrganisms />
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTestimonial}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card p-8 relative z-10"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg shrink-0">
                              <img 
                                src={testimonials[activeTestimonial].image} 
                                alt={testimonials[activeTestimonial].name} 
                                className="w-full h-full object-cover"
                              />
                          </div>
                          
                    <div className="flex-grow">
                      <div className="flex items-center mb-4">
                              {[...Array(5)].map((_, i) => (
                          <Star 
                                  key={i}
                            className={`w-5 h-5 ${i < testimonials[activeTestimonial].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                                />
                              ))}
                        </div>
                        
                      <blockquote className="text-lg text-gray-700 dark:text-gray-300 italic mb-4">
                        "{testimonials[activeTestimonial].quote}"
                      </blockquote>
                      
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{testimonials[activeTestimonial].name}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonials[activeTestimonial].title}</p>
                      </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  
              <div className="flex justify-center gap-2 mt-6">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${index === activeTestimonial ? 'bg-yogurt-red' : 'bg-gray-300 dark:bg-gray-700'}`}
                        onClick={() => setActiveTestimonial(index)}
                    aria-label={`View testimonial ${index + 1}`}
                      />
                    ))}
                </div>
          </div>
        </div>
      </section>

        {/* Subscription Banner */}
      <section 
          ref={sectionRefs.subscribe} 
          id="subscribe" 
          className="py-20 bg-gradient-to-r from-yogurt-red to-berry text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-pattern-dots"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/20 blur-3xl"></div>
          </div>
              
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Yogurt Lovers Community</h2>
                <p className="text-lg mb-8 text-white/90">
                  Subscribe to our newsletter for exclusive recipes, special offers, and healthy lifestyle tips.
                </p>
                
                {!isSubscribed ? (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={subscribeEmail}
                      onChange={(e) => setSubscribeEmail(e.target.value)}
                      className="flex-grow px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                      required
                    />
                    <button
                      type="submit"
                      className="px-8 py-4 bg-white text-yogurt-red font-medium rounded-xl hover:bg-white/90 transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                ) : (
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-lg mx-auto border border-white/30">
                    <Sparkles className="w-8 h-8 mx-auto mb-4" />
                    <p className="text-xl font-medium mb-2">Thank You for Subscribing!</p>
                    <p>You'll be the first to know about our new products and promotions.</p>
                </div>
                )}
                
                <p className="text-sm mt-4 text-white/70">
                  By subscribing, you agree to receive marketing emails from Bogani. You can unsubscribe at any time.
                </p>
              </motion.div>
                </div>
            </div>
          </section>

        {/* Instagram Feed */}
          <section 
            ref={sectionRefs.instagram} 
            id="instagram" 
          className="py-24 bg-white dark:bg-gray-800"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
              <div>
              <SectionHeading 
                  title="Follow Us on Instagram" 
                  subtitle="@bogani_yogurt"
                isVisible={visibleSections.includes('instagram')}
                  highlightWord="Instagram"
                  className="mb-0"
                />
              </div>
              
              <a 
                href="https://instagram.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                className="mt-6 md:mt-0 inline-flex items-center gap-2 text-yogurt-red hover:text-berry transition-colors font-medium"
              >
                View Our Profile
                <ExternalLink className="w-4 h-4" />
              </a>
                      </div>
                      
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {instagramPosts.map((post, index) => (
            <motion.a 
                  key={post.id}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group aspect-square rounded-xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <img 
                    src={post.image} 
                    alt={`Instagram post ${post.id}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm font-medium">{post.likes}</span>
                </div>
                    <p className="text-xs text-center line-clamp-3">{post.caption}</p>
                </div>
                      </motion.a>
                        ))}
          </div>
        </div>
      </section>


        
        </main>
    </div>
  );
};

export default Home;