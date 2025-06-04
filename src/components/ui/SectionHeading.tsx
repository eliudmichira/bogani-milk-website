import React from 'react';
import { motion } from 'framer-motion';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  isVisible?: boolean;
  highlightWord?: string;
  className?: string;
  style?: React.CSSProperties;
}

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

export default SectionHeading;
