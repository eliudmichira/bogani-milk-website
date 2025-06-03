import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronLeft, Check } from "lucide-react";

interface ProductFlipCardProps {
  image: string;
  flavor: 'strawberry' | 'vanilla';
  name: string;
  description: string;
  price: string;
  onAddToCart: () => void;
}

const flavorColors = {
  strawberry: {
    light: "bg-red-100",
    medium: "bg-red-500",
    dark: "bg-red-700",
    text: "text-red-700",
  },
  vanilla: {
    light: "bg-yellow-50",
    medium: "bg-yellow-400",
    dark: "bg-yellow-600",
    text: "text-yellow-600",
  },
};

const ProductFlipCard: React.FC<ProductFlipCardProps> = ({ image, flavor, name, description, price, onAddToCart }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const currentFlavorColors = flavorColors[flavor];
  
  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Simulate adding to cart
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
      
      onAddToCart();
      
      // Reset added state after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }, 800);
  };

  return (
    <div className="perspective-card h-96 w-full cursor-pointer">
      <motion.div
        className="relative w-full h-full transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of Card */}
        <div 
          className="absolute inset-0 rounded-xl overflow-hidden shadow-lg flex flex-col backface-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${currentFlavorColors.light}, ${currentFlavorColors.medium})`,
            border: `2px solid ${currentFlavorColors.medium}`
          }}
        >
          <div className="p-6 flex-grow flex flex-col items-center justify-center text-center">
            <motion.div
              className="w-40 h-40 mb-4 relative"
              whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <img src={image} alt={name} className="w-full h-full object-contain" />
              
              {/* Decorative bubbles for probiotic effect */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: `${Math.random() * 10 + 5}px`,
                      height: `${Math.random() * 10 + 5}px`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      backgroundColor: i % 2 === 0 ? currentFlavorColors.dark : currentFlavorColors.medium,
                      opacity: Math.random() * 0.5 + 0.1,
                      animation: `bubble-float ${Math.random() * 4 + 3}s ease-in-out infinite alternate`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  ></div>
                ))}
              </div>
            </motion.div>
            
            <h3 className="text-xl font-bold" style={{ color: currentFlavorColors.text }}>{name}</h3>
            <p className="text-sm mt-1 opacity-90" style={{ color: currentFlavorColors.text }}>{price}</p>
          </div>
          
          <div className="p-4 flex justify-center">
            <motion.button
              onClick={() => setIsFlipped(true)}
              className="px-6 py-2 text-white rounded-full text-sm font-medium"
              style={{ backgroundColor: currentFlavorColors.dark }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </motion.button>
          </div>
        </div>
        
        {/* Back of Card */}
        <div 
          className="absolute inset-0 rounded-xl overflow-hidden shadow-lg flex flex-col backface-hidden bg-white"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="p-6 flex-grow flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">{name}</h3>
              <motion.button
                onClick={() => setIsFlipped(false)}
                className="text-gray-500 hover:text-gray-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
            </div>
            
            <p className="text-gray-600 text-sm mb-6">{description}</p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Nutrition Facts</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="flex justify-between">
                  <span>Calories</span>
                  <span>120</span>
                </li>
                <li className="flex justify-between">
                  <span>Protein</span>
                  <span>5g</span>
                </li>
                <li className="flex justify-between">
                  <span>Calcium</span>
                  <span>15% DV</span>
                </li>
                <li className="flex justify-between">
                  <span>Probiotics</span>
                  <span>10B CFU</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-auto flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">{price}</span>
              <motion.button
                onClick={handleAddToCart}
                className="px-6 py-2 text-white rounded-full text-sm font-medium flex items-center"
                style={{ backgroundColor: isAdded ? "#4CAF50" : currentFlavorColors.dark }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isAdding || isAdded}
              >
                {isAdding ? (
                  <span className="flex items-center">
                    <motion.div
                      className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                    Adding...
                  </span>
                ) : isAdded ? (
                  <span className="flex items-center">
                    <Check className="w-4 h-4 mr-1" />
                    Added!
                  </span>
                ) : (
                  <span className="flex items-center">
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    Add to Cart
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
      
      <style>{`
        .perspective-card {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        @keyframes bubble-float {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default ProductFlipCard;