import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  isVisible: boolean;
  highlightWord?: string;
  center?: boolean;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  isVisible,
  highlightWord,
  center = true,
  delay = 0,
  className,
  style,
}) => {
  // If a highlight word is provided, wrap it in a span with fancy text
  const formattedTitle = highlightWord
    ? title.replace(
        highlightWord,
        `<span class="fancy-text">${highlightWord}</span>`
      )
    : title;

  return (
    <div className={`mb-16 ${center ? "text-center" : ""} ${className || ''}`}>
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-6 text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay }}
        dangerouslySetInnerHTML={{ __html: formattedTitle }}
        style={style}
      />

      {subtitle && (
        <motion.p
          className={`text-gray-600 ${
            center ? "max-w-xl mx-auto" : "max-w-2xl"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;