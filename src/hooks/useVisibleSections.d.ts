import type { RefObject } from 'react';
type HTMLElementRef = RefObject<HTMLElement | null>;
export declare const useVisibleSections: () => {
    visibleSections: string[];
    registerSection: (id: string, ref: HTMLElementRef) => void;
};
export {};
