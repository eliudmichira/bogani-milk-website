import React from 'react';
interface SectionOptions extends IntersectionObserverInit {
}
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
export declare const useVisibleSections: (sectionIds: string[], options?: SectionOptions) => {
    [key: string]: boolean;
};
export declare const NucleusNavigation: React.MemoExoticComponent<({ items }: {
    items: NucleusItemData[];
}) => import("react/jsx-runtime").JSX.Element>;
export declare const ProductSphere: React.MemoExoticComponent<() => import("react/jsx-runtime").JSX.Element>;
export declare const MicrobiomeJourney: React.MemoExoticComponent<() => import("react/jsx-runtime").JSX.Element>;
interface BiomeVisualizationProps {
    stage: string;
}
export declare const BiomeVisualization: React.MemoExoticComponent<({ stage }: BiomeVisualizationProps) => import("react/jsx-runtime").JSX.Element>;
interface GlassmorphicCardProps {
    product: any;
}
export declare const GlassmorphicCard: React.MemoExoticComponent<({ product }: GlassmorphicCardProps) => import("react/jsx-runtime").JSX.Element>;
export declare const BiosphereParticles: React.MemoExoticComponent<({ count, className }: BiosphereParticlesProps) => import("react/jsx-runtime").JSX.Element>;
export declare const FluidGradient: React.MemoExoticComponent<() => import("react/jsx-runtime").JSX.Element>;
export declare const TestimonialOrganisms: React.MemoExoticComponent<({ testimonials }: {
    testimonials: Testimonial[];
}) => import("react/jsx-runtime").JSX.Element | null>;
export declare const BiosphereStyles = "\n:root {\n  /* Primary palette - Biomorphic colors */\n  --color-primary: #D50000; /* Yogurt red */\n  --color-primary-dark: #B71C1C; /* Darker red for dark mode */\n  --color-secondary: #4FC1E9; /* Bioluminescent blue */\n  --color-secondary-dark: #0288D1; /* Darker blue for dark mode */\n  --color-accent: #4CAF50; /* Probiotic green */\n  --color-accent-dark: #2E7D32; /* Darker green for dark mode */\n  --color-tertiary: #9C27B0; /* Berry purple */\n  --color-tertiary-dark: #7B1FA2; /* Darker purple for dark mode */\n  --color-highlight: #F2EA7E; /* Cream yellow */\n  --color-highlight-dark: #D4B92B; /* Darker yellow for dark mode */\n  \n  /* Functional colors */\n  --color-background: #FFFFFF; /* Light background */\n  --color-background-dark: #121A29; /* Deep space blue for dark mode */\n  --color-surface: rgba(255, 255, 255, 0.05);\n  --color-surface-dark: rgba(18, 26, 41, 0.3);\n  --color-on-surface: rgba(0, 0, 0, 0.87);\n  --color-on-surface-dark: rgba(255, 255, 255, 0.87);\n  --color-inactive: rgba(0, 0, 0, 0.3);\n  --color-inactive-dark: rgba(255, 255, 255, 0.3);\n  --color-completed: var(--color-accent);\n  --color-completed-dark: var(--color-accent-dark);\n}\n\n/* Media query for dark mode */\n@media (prefers-color-scheme: dark) {\n  :root {\n    --color-primary: var(--color-primary-dark);\n    --color-secondary: var(--color-secondary-dark);\n    --color-accent: var(--color-accent-dark);\n    --color-tertiary: var(--color-tertiary-dark);\n    --color-highlight: var(--color-highlight-dark);\n    --color-background: var(--color-background-dark);\n    --color-surface: var(--color-surface-dark);\n    --color-on-surface: var(--color-on-surface-dark);\n    --color-inactive: var(--color-inactive-dark);\n    --color-completed: var(--color-completed-dark);\n  }\n}\n\n.dark {\n  --color-primary: var(--color-primary-dark);\n  --color-secondary: var(--color-secondary-dark);\n  --color-accent: var(--color-accent-dark);\n  --color-tertiary: var(--color-tertiary-dark);\n  --color-highlight: var(--color-highlight-dark);\n  --color-background: var(--color-background-dark);\n  --color-surface: var(--color-surface-dark);\n  --color-on-surface: var(--color-on-surface-dark);\n  --color-inactive: var(--color-inactive-dark);\n  --color-completed: var(--color-completed-dark);\n}\n\n/* Color themes based on product flavors */\n.theme-strawberry {\n  --product-color: var(--color-primary);\n  --product-glow: rgba(213, 0, 0, 0.2);\n}\n\n.theme-vanilla {\n  --product-color: var(--color-highlight);\n  --product-glow: rgba(242, 234, 126, 0.2);\n}\n\n.theme-berry {\n  --product-color: var(--color-tertiary);\n  --product-glow: rgba(156, 39, 176, 0.2);\n}\n\n/* Responsive design adjustments */\n@media (max-width: 768px) {\n  .nucleus-navigation {\n    height: 160px;\n  }\n  \n  .product-sphere {\n    max-width: 300px;\n    height: 300px;\n  }\n}\n\n@media (max-width: 640px) {\n  .microbiome-journey .journey-timeline {\n    overflow-x: auto;\n    padding-bottom: 1rem;\n  }\n  \n  .glass-card {\n    padding: 1.5rem;\n  }\n}\n\n/* Reduced motion preferences */\n@media (prefers-reduced-motion: reduce) {\n  .nucleus-item,\n  .product-sphere,\n  .biome-visualization,\n  .glass-card,\n  .biosphere-particles,\n  .fluid-gradient,\n  .testimonial-organisms {\n    transition: none !important;\n    animation: none !important;\n  }\n}\n\n.glass-card {\n  background: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(20px);\n  border-radius: 24px;\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  padding: 2rem;\n  position: relative;\n  overflow: hidden;\n  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  box-shadow: \n    0 4px 30px rgba(0, 0, 0, 0.1),\n    inset 0 0 1px 1px rgba(255, 255, 255, 0.1);\n}\n\n.dark .glass-card {\n  background: rgba(18, 26, 41, 0.4);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  box-shadow: \n    0 4px 30px rgba(0, 0, 0, 0.3),\n    inset 0 0 1px 1px rgba(255, 255, 255, 0.05);\n}\n\n.nucleus-navigation {\n  width: 100%;\n  height: 200px;\n  position: relative;\n  margin-bottom: 40px;\n}\n\n.nucleus-item:focus-visible {\n  outline: 2px solid var(--color-accent);\n  outline-offset: 4px;\n  border-radius: 8px;\n}\n\n.microbiome-journey .journey-timeline {\n  position: relative;\n}\n\n.microbiome-journey .connector {\n  right: calc(-50% - 0.5rem);\n  width: calc(100% + 1rem);\n}\n\n.microbiome-journey .timeline-node:focus-visible {\n  outline: 2px solid var(--color-accent);\n  outline-offset: 4px;\n  border-radius: 8px;\n}\n\n.product-sphere {\n  perspective: 1000px;\n}\n\n.biosphere-particles {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  z-index: 0;\n}\n\n.glass-card:focus-visible {\n  outline: 2px solid var(--color-accent);\n  outline-offset: 4px;\n}\n\n.testimonial-organisms button:focus-visible {\n  outline: 2px solid var(--color-accent);\n  outline-offset: 2px;\n}\n\n.display-text {\n  font-size: clamp(2.8rem, 3.5vw, 4rem);\n  font-weight: 700;\n  background: linear-gradient(\n    to right,\n    var(--color-primary),\n    var(--color-tertiary),\n    var(--color-accent)\n  );\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n  line-height: 1;\n  letter-spacing: -0.02em;\n}\n\n.dark .display-text {\n  background: linear-gradient(\n    to right,\n    var(--color-highlight),\n    var(--color-secondary),\n    var(--color-accent)\n  );\n  -webkit-background-clip: text;\n  background-clip: text;\n}\n\n/* Skip to content link for accessibility */\n.skip-to-content {\n  position: absolute;\n  top: -40px;\n  left: 0;\n  background: var(--color-primary);\n  color: white;\n  padding: 8px;\n  z-index: 100;\n  transition: top 0.3s;\n}\n\n.skip-to-content:focus {\n  top: 0;\n}\n";
export declare const useThemeToggle: (initialTheme?: string) => {
    theme: string;
    toggleTheme: () => void;
};
export {};
