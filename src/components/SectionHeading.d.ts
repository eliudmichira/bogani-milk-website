import React from "react";
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
declare const SectionHeading: React.FC<SectionHeadingProps>;
export default SectionHeading;
