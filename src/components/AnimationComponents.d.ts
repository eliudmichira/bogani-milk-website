import React from "react";
export declare const MilkSplash: React.FC;
interface ProbioticBubblesProps {
    count?: number;
}
export declare const ProbioticBubbles: React.FC<ProbioticBubblesProps>;
interface WaveDividerProps {
    color?: string;
    flipY?: boolean;
}
export declare const WaveDivider: React.FC<WaveDividerProps>;
interface YogurtSwirlProps {
    color: string;
}
export declare const YogurtSwirl: React.FC<YogurtSwirlProps>;
interface ScrollIndicatorProps {
    onClick?: () => void;
    direction?: 'down' | 'right';
}
export declare const ScrollIndicator: React.FC<ScrollIndicatorProps>;
export {};
