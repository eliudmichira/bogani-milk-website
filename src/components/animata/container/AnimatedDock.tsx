import { cn } from "../../../lib/utils";
import {
  type MotionValue,
  AnimatePresence, 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform,
  MotionConfig
} from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useRef, useState, type ReactNode, useEffect } from "react";
import {
  Menu, 
  X,
  ChevronUp
} from "lucide-react";
import { ThemeToggle } from "../../ui/ThemeToggle";

// Interface for items in the dock
interface DockItem {
  title: string;
  icon: ReactNode;
  href: string;
  isNavLink?: boolean;
  color?: string;
}

// Interface for props accepted by the AnimatedDock component
interface AnimatedDockProps {
  items: DockItem[];
  largeClassName?: string; 
  smallClassName?: string; 
  dockPosition?: 'top' | 'bottom';
  accentColor?: string;
  secondaryColor?: string;
}

// Main AnimatedDock component that renders both LargeDock and SmallDock
export default function AnimatedDock({ 
  items, 
  largeClassName, 
  smallClassName, 
  dockPosition = 'bottom',
  accentColor = 'hsl(144, 70%, 30%)', // Default green
  secondaryColor = 'hsl(350, 100%, 60%)', // Default red
}: AnimatedDockProps) {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [showPointer, setShowPointer] = useState(false);
  
  // Update active item based on current location
  useEffect(() => {
    const current = items.find(item => 
      location.pathname === item.href || 
      (item.href !== '/' && location.pathname.startsWith(item.href))
    );
    setActiveItem(current?.href || null);
  }, [location, items]);

  // Position class based on dockPosition prop
  const positionClass = dockPosition === 'top' 
    ? 'fixed top-5 left-1/2 -translate-x-1/2 z-50' 
    : 'fixed bottom-5 left-1/2 -translate-x-1/2 z-50';

  return (
    <MotionConfig transition={{ type: "spring", stiffness: 300, damping: 30 }}>
      <div className={positionClass}>
        <LargeDock 
          items={items} 
          className={largeClassName} 
          activeItem={activeItem}
          accentColor={accentColor}
          secondaryColor={secondaryColor}
          onShowPointer={setShowPointer}
        />
        <SmallDock 
          items={items} 
          className={smallClassName} 
          activeItem={activeItem}
          accentColor={accentColor}
          secondaryColor={secondaryColor}
        />
        
        {/* Animated scroll indicator that appears when hovering dock */}
        <AnimatePresence>
          {showPointer && (
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 hidden md:flex"
              style={{ 
                bottom: dockPosition === 'bottom' ? '100%' : 'auto',
                top: dockPosition === 'top' ? '100%' : 'auto',
                marginBottom: dockPosition === 'bottom' ? '8px' : '0',
                marginTop: dockPosition === 'top' ? '8px' : '0',
              }}
              initial={{ opacity: 0, y: dockPosition === 'bottom' ? 10 : -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: dockPosition === 'bottom' ? 5 : -5 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronUp 
                size={18} 
                className={dockPosition === 'top' ? 'rotate-180' : ''}
                style={{ color: accentColor, filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.2))' }} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

// Component for the large dock, visible on larger screens
const LargeDock = ({
  items,
  className,
  activeItem,
  accentColor,
  secondaryColor,
  onShowPointer
}: {
  items: DockItem[];
  className?: string;
  activeItem: string | null;
  accentColor: string;
  secondaryColor: string;
  onShowPointer: (show: boolean) => void;
}) => {
  const mouseXPosition = useMotionValue(Infinity);
  
  return (
    <motion.div
      onMouseMove={(e) => mouseXPosition.set(e.pageX)}
      onMouseLeave={() => {
        mouseXPosition.set(Infinity);
        onShowPointer(false);
      }}
      onMouseEnter={() => onShowPointer(true)}
      className={cn(
        "mx-auto hidden h-16 items-center gap-4 rounded-full px-4 py-2 shadow-lg md:flex",
        "border border-white/30 transition-all duration-300",
        // Glass morphism effects
        "bg-white/20 backdrop-blur-md dark:bg-gray-800/20 dark:border-gray-700/50",
        // Animation states
        "hover:shadow-xl hover:bg-white/25 dark:hover:bg-gray-800/25",
        className,
      )}
    >
      {items.map((item) => (
        <DockIcon 
          mouseX={mouseXPosition} 
          key={item.title} 
          {...item} 
          isActive={activeItem === item.href}
          accentColor={accentColor}
          secondaryColor={secondaryColor}
        />
      ))}
      <div className="ml-2 relative z-10"> 
        <ThemeToggle />
      </div>
    </motion.div>
  );
};

// Component for individual icons in the dock
function DockIcon({
  mouseX,
  title,
  icon,
  href,
  isActive = false,
  accentColor,
  secondaryColor,
  color
}: {
  mouseX: MotionValue;
  title: string;
  icon: ReactNode;
  href: string;
  isActive?: boolean;
  accentColor: string;
  secondaryColor: string;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate distance from mouse for animations
  const distanceFromMouse = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Enhanced animation values for smoother effects
  const widthTransform = useTransform(distanceFromMouse, [-150, 0, 150], [44, 72, 44]);
  const heightTransform = useTransform(distanceFromMouse, [-150, 0, 150], [44, 72, 44]);
  const iconSizeTransform = useTransform(distanceFromMouse, [-150, 0, 150], [22, 34, 22]);
  const opacityTransform = useTransform(distanceFromMouse, [-250, -150, 0, 150, 250], [0.7, 0.8, 1, 0.8, 0.7]);
  
  // Apply spring physics for natural motion
  const width = useSpring(widthTransform, { mass: 0.2, stiffness: 150, damping: 15 });
  const height = useSpring(heightTransform, { mass: 0.2, stiffness: 150, damping: 15 });
  const iconSize = useSpring(iconSizeTransform, { mass: 0.2, stiffness: 150, damping: 15 });
  const opacity = useSpring(opacityTransform, { mass: 0.2, stiffness: 100, damping: 20 });

  // Generate dynamic styles
  const iconColor = color || (isActive ? accentColor : 'currentColor');
  const iconHoverColor = isActive ? accentColor : secondaryColor;
  
  const activeBg = `color-mix(in srgb, ${accentColor} 15%, transparent)`;
  const hoverBg = `color-mix(in srgb, ${iconHoverColor} 10%, transparent)`;

  return (
    <Link 
      to={href} 
      className="outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded-full"
      aria-label={title}
      aria-current={isActive ? 'page' : undefined}
    >
      <motion.div
        ref={ref}
        style={{ 
          width, 
          height,
          opacity,
          backgroundColor: isActive 
            ? activeBg 
            : isHovered 
              ? hoverBg
              : 'rgba(255, 255, 255, 0.5)'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative flex aspect-square items-center justify-center rounded-full transition-colors shadow-sm",
          "dark:bg-gray-700/50 dark:hover:bg-gray-600/60",
          isActive && "ring-1 ring-white/40 dark:ring-gray-500/40",
        )}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 5, x: "-50%" }}
              className="absolute -top-10 left-1/2 whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium shadow-sm z-10"
              style={{ 
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                color: 'white',
                backdropFilter: 'blur(4px)'
              }}
            >
              {title}
              {isActive && (
                <motion.div 
                  className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1 w-1.5 h-1.5 rotate-45"
                  style={{ backgroundColor: 'rgba(17, 24, 39, 0.9)' }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icon */}
        <motion.div
          style={{ 
            width: iconSize, 
            height: iconSize,
            color: isHovered ? iconHoverColor : iconColor 
          }}
          className="flex items-center justify-center transition-colors"
        >
          {icon}
        </motion.div>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute -bottom-1 left-1/2 h-1 w-1 rounded-full"
            initial={false}
            animate={{ 
              width: isHovered ? '50%' : '20%',
              translateX: '-50%'
            }}
            style={{ backgroundColor: accentColor }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>
    </Link>
  );
}

// Small Dock component (for mobile)
const SmallDock = ({
  items,
  className,
  activeItem,
  accentColor,
  secondaryColor
}: {
  items: DockItem[];
  className?: string;
  activeItem: string | null;
  accentColor: string;
  secondaryColor: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div ref={menuRef} className={cn("md:hidden relative", className)}>
      <button
        onClick={toggleMenu}
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300",
          "bg-white/20 backdrop-blur-md dark:bg-gray-800/20 dark:border-gray-700/50 border border-white/30",
          isOpen ? "rotate-90" : "rotate-0"
        )}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X size={24} className="text-gray-700 dark:text-gray-200" />
        ) : (
          <Menu size={24} className="text-gray-700 dark:text-gray-200" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-full mb-2 w-48 bg-white/90 backdrop-blur-md rounded-md shadow-lg overflow-hidden dark:bg-gray-800/90 border border-white/30 dark:border-gray-700/50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {items.map((item) => (
              <MobileMenuItem
                key={item.title}
                href={item.href}
                title={item.title}
                icon={item.icon}
                isActive={activeItem === item.href}
                accentColor={accentColor}
                secondaryColor={secondaryColor}
                onClick={toggleMenu}
              />
            ))}
             {/* Theme Toggle in mobile menu */}
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Component for individual mobile menu items
const MobileMenuItem = ({
  href, 
  title, 
  icon, 
  isActive, 
  accentColor,
  secondaryColor,
  onClick 
}: { 
  href: string; 
  title: string; 
  icon: ReactNode; 
  isActive?: boolean;
  accentColor: string;
  secondaryColor: string;
  onClick: () => void;
}) => {
  return (
    <Link 
      to={href} 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-full p-3 text-sm font-medium shadow-md transition-all duration-200",
        "bg-white/90 backdrop-blur-md text-gray-800 dark:bg-gray-800/90 dark:text-gray-200",
        "hover:bg-white dark:hover:bg-gray-700"
      )}
      style={isActive ? {
        backgroundColor: `color-mix(in srgb, ${accentColor} 15%, ${
          typeof window !== 'undefined' && 
          window.matchMedia && 
          window.matchMedia('(prefers-color-scheme: dark)').matches 
            ? 'rgba(31, 41, 55, 0.9)' 
            : 'rgba(255, 255, 255, 0.9)'
        })`,
        boxShadow: `0 0 0 1px ${accentColor}25, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
      } : {}}
      aria-current={isActive ? 'page' : undefined}
    >
      <motion.div
        style={{ color: isActive ? accentColor : 'currentColor' }}
        whileHover={{ scale: 1.1, color: secondaryColor }}
        whileTap={{ scale: 0.9 }}
      >
        {icon}
      </motion.div>
      <span style={isActive ? { color: accentColor, fontWeight: 600 } : {}}>
        {title}
      </span>
      
      {/* Active indicator dot */}
      {isActive && (
        <motion.div
          layoutId="mobileActiveIndicator"
          className="ml-1 h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      )}
    </Link>
  );
};