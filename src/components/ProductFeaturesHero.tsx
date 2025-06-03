import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShieldCheck, Droplets, GlassWater, ThermometerSnowflake, LayoutList, X } from "lucide-react";

interface Feature {
  title: string;
  icon: ReactNode;
  color: string;
  description: string;
  image: string;
  details: string[];
}

const ProductFeaturesHero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const features: Feature[] = [
    {
      title: "Live Cultures",
      icon: <Droplets className="w-6 h-6" />,
      color: "#D50000", // Primary red
      description: "Each cup contains 10 billion CFU of live probiotic cultures, including Lactobacillus acidophilus and Bifidobacterium, which support gut health and improve digestion.",
      image: "/api/placeholder/500/300", // Replace with actual feature image
      details: [
        "Multiple probiotic strains for maximum benefit",
        "Scientifically proven to survive stomach acid",
        "Supports balanced gut microbiome"
      ]
    },
    {
      title: "Natural Ingredients",
      icon: <GlassWater className="w-6 h-6" />,
      color: "#4CAF50", // Accent green
      description: "Made with fresh, local milk and natural flavors with no artificial preservatives, colors, or sweeteners. We source our ingredients responsibly.",
      image: "/api/placeholder/500/300", // Replace with actual feature image
      details: [
        "Locally sourced milk from free-range cows",
        "Real fruit preparations with no artificial flavors",
        "No GMO ingredients"
      ]
    },
    {
      title: "Quality Controlled",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "#F2EA7E", // Yellow
      description: "Our production facility adheres to the highest standards of quality and safety, with rigorous testing at every stage of production.",
      image: "/api/placeholder/500/300", // Replace with actual feature image
      details: [
        "ISO 22000 certified production facility",
        "Multiple quality checks throughout production",
        "Cold chain maintained from factory to store"
      ]
    },
    {
      title: "Cold Processed",
      icon: <ThermometerSnowflake className="w-6 h-6" />,
      color: "#2196F3", // Blue for variation
      description: "Our yogurt is processed at low temperatures to preserve the beneficial bacteria and natural enzymes in the milk, enhancing both nutrition and flavor.",
      image: "/api/placeholder/500/300", // Replace with actual feature image
      details: [
        "Temperature-controlled processing",
        "Preserves natural enzymes in milk",
        "Maintains probiotic viability"
      ]
    },
    {
      title: "Nutritionally Balanced",
      icon: <LayoutList className="w-6 h-6" />,
      color: "#9C27B0", // Purple for variation
      description: "Each serving provides a balanced mix of protein, calcium, and probiotics with low added sugar, making it a perfect addition to a healthy diet.",
      image: "/api/placeholder/500/300", // Replace with actual feature image
      details: [
        "5g of protein per serving",
        "15% of daily calcium requirements",
        "Less sugar than average yogurt products"
      ]
    },
  ];

  // Open feature detail modal
  const openFeatureDetail = (feature: Feature) => {
    setSelectedFeature(feature);
  };

  // Close feature detail modal
  const closeFeatureDetail = () => {
    setSelectedFeature(null);
  };

  return (
    <div ref={ref} className="relative overflow-hidden max-w-6xl mx-auto py-16">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800"
      >
        Premium Quality in Every Cup
      </motion.h3>

      {/* Yogurt splatter background effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="yogurt-splatter"></div>
      </div>

      {/* Features hexagon layout */}
      <div className="hexagon-container relative mx-auto">
        {features.map((feature: Feature, index: number) => {
          const angle = (index * (2 * Math.PI)) / features.length;
          const radius = 200; // Adjust this for layout size
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="hexagon-item absolute left-1/2 top-1/2"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <motion.button
                className="bg-white rounded-xl p-5 shadow-lg flex flex-col items-center justify-center w-32 h-32 text-center"
                style={{ 
                  borderTop: `3px solid ${feature.color}`,
                  boxShadow: `0 10px 25px -5px ${feature.color}22`
                }}
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: `0 20px 30px -10px ${feature.color}33`,
                  borderTop: `3px solid ${feature.color}`,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openFeatureDetail(feature)}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  style={{ color: feature.color }}
                >
                  {feature.icon}
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {feature.title}
                </span>
              </motion.button>
            </motion.div>
          );
        })}

        {/* Center yogurt cup image */}
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40"
          initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-white rounded-full opacity-80"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/api/placeholder/160/160" // Replace with actual product image
                alt="Bogani Yogurt" 
                className="w-32 h-32 object-contain"
              />
            </div>
            
            {/* Pulsing circles animation */}
            <div className="absolute inset-0">
              <div className="animate-pulse-slow absolute inset-0 rounded-full border-2 border-primaryRed opacity-20"></div>
              <div className="animate-pulse-slower absolute inset-0 rounded-full border-2 border-accentGreen opacity-10" style={{ animationDelay: "1s" }}></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Feature detail modal */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFeatureDetail}
          >
            <motion.div
              className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48">
                <img
                  src={selectedFeature.image}
                  alt={selectedFeature.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to bottom, transparent 0%, ${selectedFeature.color}99 100%)`,
                  }}
                ></div>
                <motion.button
                  onClick={closeFeatureDetail}
                  className="absolute top-3 right-3 bg-white/90 text-gray-800 rounded-full p-2 hover:bg-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
                <div className="absolute bottom-4 left-4 flex items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: selectedFeature.color }}
                  >
                    <div className="text-white">{selectedFeature.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedFeature.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">{selectedFeature.description}</p>
                
                <h4 className="font-semibold text-gray-800 mb-2">Key Benefits:</h4>
                <ul className="space-y-2 mb-6">
                  {selectedFeature.details.map((detail: string, idx: number) => (
                    <motion.li
                      key={idx}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div 
                        className="mt-1 mr-2 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: selectedFeature.color }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-gray-700">{detail}</span>
                    </motion.li>
                  ))}
                </ul>
                
                {/* Call to action button */}
                <div className="flex justify-end">
                  <motion.button
                    className="px-6 py-2 text-white rounded-full text-sm font-medium"
                    style={{ backgroundColor: selectedFeature.color }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Description below layout */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center text-gray-600 mt-16 max-w-2xl mx-auto"
      >
        At Bogani, we're committed to creating the finest probiotic yogurt using traditional methods combined with modern food science. Click on each feature to learn more about what makes our yogurt special.
      </motion.p>

      <style>{`
        .hexagon-container {
          width: 450px; /* Adjust as needed */
          height: 500px;
          max-width: 600px;
          position: relative;
        }

        .yogurt-splatter {
          background-image: radial-gradient(
            circle at 50% 50%,
            rgba(213, 0, 0, 0.2) 10%,
            rgba(76, 175, 80, 0.2) 30%,
            rgba(242, 234, 126, 0.2) 50%,
            transparent 70%
          );
          width: 150%;
          height: 150%;
          left: -25%;
          top: -25%;
          position: absolute;
          animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-pulse-slower {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductFeaturesHero;