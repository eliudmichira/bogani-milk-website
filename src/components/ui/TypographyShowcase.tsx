import React from 'react';

const TypographyShowcase: React.FC = () => {
  return (
    <section id="typography-showcase" className="py-12 md:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-yogurt-red dark:text-red-400">SF Pro Display Headings</h2>
        <p className="font-sans text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300">
          Body text uses SF Pro Text. This ensures a clean, legible experience across devices.
          Apple devices will render using the beautiful SF Pro fonts, while other systems use high-quality fallbacks.
        </p>
        
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-3 text-gray-900 dark:text-white">Display Heading Level 3</h3>
            <p className="font-sans text-gray-600 dark:text-gray-400">
              This is a paragraph styled with <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">font-sans</code>. 
              We can also use <span className="text-accent-green dark:text-green-400 font-medium">brand accent colors</span> for emphasis.
            </p>
          </div>
          
          <div>
            <h4 className="font-display text-xl md:text-2xl font-medium mb-2 text-yogurt-red dark:text-red-500">Display Heading Level 4 (Yogurt Red)</h4>
            <p className="font-sans text-sm text-gray-500 dark:text-gray-500">
              Smaller body text for captions or less prominent information. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="mt-8 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 shadow-sm">
            <p className="font-sans text-xs text-gray-500 dark:text-gray-400">
              <strong className="text-gray-700 dark:text-gray-300">Font Usage Note:</strong> This website utilizes system fonts to display Apple's SF Pro (SF Pro Text & SF Pro Display) on Apple devices. 
              On other operating systems, appropriate system-default sans-serif fonts are used as fallbacks. 
              This approach respects Apple's font licensing guidelines for web usage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypographyShowcase; 