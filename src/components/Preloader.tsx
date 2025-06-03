import { useEffect, useState, useRef, type FC } from "react";
import { motion } from "framer-motion";
import logoImg from "../assets/logo.jpg";
import GaugeChart from "./animata/graphs/GaugeChart";

// Brand colors (using CSS variables defined in index.css via Tailwind config)
const BOGANI_GREEN = "var(--bogani-green)";
const CHARCOAL_BLACK = "var(--charcoal-black)";
const FRESH_BERRY_RED = "var(--fresh-berry-red)";

interface PreloaderProps {
  onLoaded: () => void;
}

const Preloader: FC<PreloaderProps> = ({ onLoaded }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showBubbles, setShowBubbles] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  
  const bubblesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const sequence = async () => {
      setShowBubbles(true);
      setTimeout(() => setShowLogo(true), 400);
      setTimeout(() => setShowText(true), 800);
    };
    sequence();
    
    let frame: number;
    let start: number | null = null;
    const duration = 2500;
    
    function animateProgress(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progressValue = Math.min(100, (elapsed / duration) * 100);
      setProgress(progressValue);
      
      if (elapsed < duration) {
        frame = requestAnimationFrame(animateProgress);
      } else {
        setProgress(100);
        setTimeout(() => setFadeOut(true), 300); 
        setTimeout(() => {
          onLoaded();
        }, 800);
      }
    }
    
     setTimeout(() => {
         frame = requestAnimationFrame(animateProgress);
     }, 500);
    
    const createBubbles = () => {
      const bubbleContainer = bubblesRef.current;
      if (!bubbleContainer) return;
      while (bubbleContainer.firstChild) {
        bubbleContainer.removeChild(bubbleContainer.firstChild);
      }
      // Bubble colors will use the new brand palette indirectly if they reference CSS vars
      // Or we can update the COLORS array if it was used directly.
      // For now, assuming the CSS handles bubble colors if they are styled via global classes.
      // If COLORS array was used for direct styling of bubbles, it should be updated to brand colors.
      const brandBubbleColors = [BOGANI_GREEN, FRESH_BERRY_RED, "#F2EA7E"]; // Example update if needed

      for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        const size = Math.random() * 15 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const animDuration = Math.random() * 8 + 4;
        const delay = Math.random() * 3;
        bubble.className = 'bubble'; // Ensure .bubble styles in CSS use brand colors or are updated
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${posX}%`;
        bubble.style.bottom = `${posY}%`;
        bubble.style.animationDuration = `${animDuration}s`;
        bubble.style.animationDelay = `${delay}s`;
        const colorIndex = Math.floor(Math.random() * brandBubbleColors.length);
        bubble.style.backgroundColor = brandBubbleColors[colorIndex];
        bubble.style.opacity = (Math.random() * 0.4 + 0.1).toString();
        bubbleContainer.appendChild(bubble);
      }
    };
    if (showBubbles) {
      createBubbles();
    }
    
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [showBubbles, onLoaded]);
  
  const letters = ["b", "o", "g", "a", "n", "i"];
  
  return (
    <motion.div
      key="preloader-bubble-version"
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden font-poppins"
      style={{ 
        background: "linear-gradient(135deg, var(--bright-white) 0%, #F8F8F8 100%)"
      }}
    >
      <div 
        ref={bubblesRef} 
        className="absolute inset-0 overflow-hidden pointer-events-none"
      ></div>
      
      <div className="relative perspective-1000 mb-8">
        <motion.div
          initial={{ opacity: 0, rotateX: -20, y: 50 }}
          animate={{ 
            opacity: showLogo ? 1 : 0, 
            rotateX: showLogo ? 0 : -20, 
            y: showLogo ? 0 : 50 
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative z-10 mb-6 transform-style-3d"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotateY: [0, 5, 0, -5, 0]}}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse"}}
              className="relative z-10"
            >
              <img
                src={logoImg}
                alt="Bogani Logo"
                className="w-28 h-28 object-contain rounded-full shadow-xl border-4 border-fresh-berry-red"
                draggable={false}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 20 }}
        transition={{ duration: 0.6 }}
        className="mb-6 relative"
      >
        <div className="flex items-center justify-center font-sans">
          {letters.map((letter, index) => {
            const isO = letter.toLowerCase() === "o";
            const isI = letter.toLowerCase() === "i";

            const letterStyle: React.CSSProperties = {
              fontFamily: "'Poppins', sans-serif",
              position: 'relative',
            };

            const animateObject: any = {
              y: [0, -8, 0],
              scale: isO ? [1, 1.15, 1] : 1,
            };
            
            let currentClassName = "text-4xl font-bold font-sans mx-1";

            if (isO) {
              letterStyle.color = "transparent";
              letterStyle.WebkitTextStroke = `2.5px ${BOGANI_GREEN}`;
            } else {
              letterStyle.color = CHARCOAL_BLACK;
              if (isI) {
                currentClassName += " letter-i-leaf";
              }
            }

            return (
              <motion.span
                key={index}
                style={letterStyle}
                animate={animateObject}
                transition={{ duration: 1.5, delay: index * 0.1, repeat: Infinity, repeatType: "mirror" }}
                className={currentClassName}
              >
                {letter}
              </motion.span>
            );
          })}
        </div>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: showText ? 1 : 0}}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-base md:text-lg font-medium font-sans text-[color:var(--charcoal-black)] text-center tracking-wider"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, letterSpacing: '0.02em' }}
        >
          YOUR OUTSIDE STARTS FROM THE INSIDE!
        </motion.h2>
      </motion.div>
      
      <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: showText ? 1 : 0,
            scale: showText ? 1 : 0.8 
          }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-4"
      >
          <GaugeChart 
              size={90}
              progress={progress} 
              gap={40}
              progressClassName="text-fresh-berry-red"
              trackClassName="text-gray-200" 
              circleWidth={6}
              progressWidth={6}
              showValue={true}
          />
      </motion.div>
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .bubble {
          position: absolute;
          border-radius: 50%;
          animation: float linear infinite;
          pointer-events: none;
        }
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          100% {
            transform: translate(var(--moveX, 100px), calc(var(--moveY, -100px) - 100vh)) rotate(var(--rotate, 360deg)) scale(0);
            opacity: 0;
          }
        }
        .bubble:nth-child(odd) {
          --moveX: calc(80px + (15 * var(--n, 0)));
          --moveY: calc(-150px - (15 * var(--n, 0)));
          --rotate: calc(180deg + (90deg * var(--n, 0)));
        }
        .bubble:nth-child(even) {
          --moveX: calc(-80px - (15 * var(--n, 0)));
          --moveY: calc(-150px - (15 * var(--n, 0)));
          --rotate: calc(180deg + (90deg * var(--n, 0)));
        }

        .letter-i-leaf::after {
          content: '';
          position: absolute;
          width: 6px;
          height: 9px;
          background-color: ${BOGANI_GREEN};
          border-radius: 50% 50% 50% 0 / 60% 60% 40% 40%;
          transform: rotate(-45deg);
          top: -5px;
          left: 1px;
        }
      `}</style>
    </motion.div>
  );
};

export default Preloader;