import { type ReactNode } from "react";
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
export default function GaugeChart({ showValue, // Default to true to show the percentage
size, progress, gap, progressClassName, // Default to Bogani Red
trackClassName, // Adjusted track color
circleWidth, // Reduced width
progressWidth, // Reduced width
rounded, className, children, }: GaugeChartProps): import("react/jsx-runtime").JSX.Element;
export {};
