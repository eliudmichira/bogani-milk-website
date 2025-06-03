import { type ReactNode, useEffect, useState } from "react";
 
import { cn } from "../../../lib/utils"; // Adjusted path to lib/utils
 
interface GaugeChartProps {
  showValue?: boolean;
  size: number;
  gap: number;
  progress: number;
  trackClassName?: string;
  progressClassName?: string;
  circleWidth?: number;
  progressWidth?: number;
  rounded?: boolean;
  className?: string;
  children?: ReactNode;
}
 
export default function GaugeChart({
  showValue = true, // Default to true to show the percentage
  size,
  progress,
  gap,
  progressClassName = "text-primaryRed", // Default to Bogani Red
  trackClassName = "text-gray-200 dark:text-gray-700", // Adjusted track color
  circleWidth = 8, // Reduced width
  progressWidth = 8, // Reduced width
  rounded = true,
  className,
  children,
}: GaugeChartProps) {
  const [currentProgress, setCurrentProgress] = useState(0);
 
  useEffect(() => {
    // Animate progress change
    const timeout = setTimeout(() => {
      setCurrentProgress(progress);
    }, 150); // Short delay before animation starts
    return () => clearTimeout(timeout);
  }, [progress]);
 
  const radius = size / 2 - Math.max(progressWidth, circleWidth) / 2; // Correct radius calculation for centered stroke
  const circumference = Math.PI * radius * 2;
  
  // Avoid values less than 0 and greater than 100
  const validatedProgress =
    currentProgress < 0 ? 0 : currentProgress > 100 ? 100 : currentProgress;
 
  // Calculate the stroke-dashoffset for the progress circle considering the gap
  // Ensure gap doesn't exceed circumference
  const safeGap = Math.min(gap, circumference * 0.99); // Limit gap to prevent full circle closure issue 
  const effectiveCircumference = circumference - safeGap;
  const strokeDashoffsetProgress =
    circumference - (validatedProgress / 100) * effectiveCircumference;
 
  const rotation = 90 + (safeGap / (2 * circumference)) * 360;
 
  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
        >
          {/* Background Circle */}
          <circle
            r={radius}
            cx={size / 2}
            cy={size / 2}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={`${circleWidth}px`}
            strokeDasharray={circumference}
            strokeDashoffset={safeGap}
            strokeLinecap={rounded ? "round" : "butt"}
            className={cn("transition-all duration-500 ease-out", trackClassName)}
            transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
          />
          {/* Progress Circle */}
          <circle
            r={radius}
            cx={size / 2}
            cy={size / 2}
            stroke="currentColor"
            className={cn("transition-all duration-1000 ease-out", progressClassName)} // Longer transition duration
            strokeWidth={`${progressWidth}px`}
            strokeLinecap={rounded ? "round" : "butt"}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffsetProgress}
            transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
          />
        </svg>
        {showValue && (
          <div
            className="absolute font-mono font-semibold text-gray-700 dark:text-gray-300" // Adjusted text styling
            style={{ fontSize: size / 5 }} // Slightly smaller font size
          >
            {Math.round(validatedProgress)}%
          </div>
        )}
        {children} 
    </div>
  );
} 