import React, { useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Sparkles, ArrowRight } from "lucide-react";
import { YogurtSwirl } from "./ui/AnimationComponents";

interface Recipe {
  title: string;
  image: string;
  description: string;
  ingredients: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
  isVisible: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isVisible }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);
  
  const springConfig = { damping: 15, stiffness: 300 };
  const scale = useSpring(1, springConfig);
  
  React.useEffect(() => {
    scale.set(cardHovered ? 1.03 : 1);
  }, [cardHovered, scale]);

  return (
    <motion.div 
      className="group relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 bg-white max-w-sm"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.6 }}
      style={{ scale }}
      onHoverStart={() => setCardHovered(true)}
      onHoverEnd={() => setCardHovered(false)}
    >
      {/* Yogurt swirl effect for recipe card */}
      <YogurtSwirl color={recipe.title.includes("Berry") ? "var(--color-primary)" : recipe.title.includes("Mango") ? "var(--color-tertiary)" : "#FFFFFF"} />
      
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Floating icon on hover */}
        <motion.button 
          onClick={() => setShowDetails(true)}
          className="absolute bottom-4 right-4 bg-white/90 text-primary rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          aria-label="View recipe details"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
      
      <div className="p-5 relative z-10">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.title}</h3>
        <p className="text-gray-600 text-sm">{recipe.description}</p>
      </div>

      {/* Recipe Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetails(false)}
          >
            <motion.div 
              className="bg-white rounded-2xl overflow-hidden max-w-md w-full shadow-2xl relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48">
                <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <motion.button 
                  onClick={() => setShowDetails(false)}
                  className="absolute top-3 right-3 bg-white/90 text-gray-800 rounded-full p-2 hover:bg-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close recipe details"
                >
                  <X className="w-5 h-5" />
                </motion.button>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold text-white">{recipe.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{recipe.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-primary" /> Ingredients:
                  </h4>
                  <ul className="space-y-1">
                    {recipe.ingredients.map((ingredient, idx) => (
                      <motion.li 
                        key={idx} 
                        className="text-gray-600 flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <span className="text-primary mr-2">•</span> {ingredient}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-end">
                  <motion.button 
                    className="text-primary font-medium flex items-center hover:text-accent transition-colors"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="View full recipe"
                  >
                    Full Recipe <ArrowRight className="w-4 h-4 ml-1" />
                  </motion.button>
                </div>
              </div>
              
              {/* Decorative bubble pattern in modal */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="15" fill="var(--color-primary)" />
                  <circle cx="50" cy="30" r="10" fill="var(--color-accent)" />
                  <circle cx="75" cy="15" r="8" fill="var(--color-tertiary)" />
                  <circle cx="35" cy="60" r="12" fill="var(--color-primary)" />
                  <circle cx="70" cy="50" r="16" fill="var(--color-accent)" />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RecipeCard;