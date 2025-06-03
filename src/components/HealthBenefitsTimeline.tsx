import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Activity, Brain, Heart, Droplets } from "lucide-react";

const HealthBenefitsTimeline = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timelineItems = [
    {
      title: "Day 1-7",
      icon: <Activity className="w-8 h-8" />,
      description: "Introduction of beneficial probiotics to your digestive system begins to support gut flora balance.",
      color: "#D50000", // Primary red
    },
    {
      title: "Week 2-3",
      icon: <Droplets className="w-8 h-8" />,
      description: "Enhanced nutrient absorption as your gut microbiome improves, leading to better overall digestion.",
      color: "#4CAF50", // Accent green
    },
    {
      title: "Month 1-2",
      icon: <Shield className="w-8 h-8" />,
      description: "Strengthened immune system as 70% of your immune cells are housed in your gut.",
      color: "#F2EA7E", // Yellow
    },
    {
      title: "Month 3+",
      icon: <Brain className="w-8 h-8" />,
      description: "Improved gut-brain connection, potentially leading to better mood and cognitive function.",
      color: "#9C27B0", // Purple for variation
    },
    {
      title: "Long-term",
      icon: <Heart className="w-8 h-8" />,
      description: "Maintained digestive health and overall wellness with regular probiotic consumption.",
      color: "#D50000", // Back to primary red
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div ref={ref} className="max-w-5xl mx-auto">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800"
      >
        Your Probiotic Journey Timeline
      </motion.h3>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative"
      >
        {/* Timeline Center Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primaryRed via-accentGreen to-primaryRed rounded-full overflow-hidden">
          {/* Animated flowing effect inside the line */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="timeline-flow"></div>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="relative space-y-16">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex items-center ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Timeline Content */}
              <div
                className={`w-5/12 ${
                  index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                }`}
              >
                <motion.h4
                  className="text-xl font-bold mb-2 text-gray-900"
                  style={{ color: item.color }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.title}
                </motion.h4>
                <p className="text-gray-600">{item.description}</p>
              </div>

              {/* Icon Circle */}
              <div className="w-2/12 flex justify-center relative">
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center z-10 shadow-lg"
                  style={{ backgroundColor: item.color }}
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <div className="text-white">{item.icon}</div>
                </motion.div>

                {/* Pulse animation around the icon */}
                <div
                  className="absolute w-16 h-16 rounded-full pulse-animation"
                  style={{ backgroundColor: item.color }}
                ></div>
              </div>

              {/* Empty space for alternating layout */}
              <div className="w-5/12"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to action at the end of timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.8 }}
        className="text-center mt-16"
      >
        <p className="text-lg text-gray-700 mb-6">
          Start your probiotic journey today and experience these benefits for yourself!
        </p>
        <motion.button
          className="px-8 py-3 bg-accentGreen text-white font-bold rounded-full shadow-md inline-flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More About Probiotics
        </motion.button>
      </motion.div>

      <style>{`
        .timeline-flow {
          width: 100%;
          height: 200%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.8) 15%,
            rgba(255, 255, 255, 0.8) 30%,
            rgba(255, 255, 255, 0) 50%
          );
          animation: flow 4s linear infinite;
        }

        @keyframes flow {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(50%);
          }
        }

        .pulse-animation {
          opacity: 0.3;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(0.95);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.3;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.5;
          }
        }

        .timeline-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
      `}</style>
    </div>
  );
};

export default HealthBenefitsTimeline;