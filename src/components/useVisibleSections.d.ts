import { type RefObject } from 'react';
interface UseVisibleSectionsReturn {
    visibleSections: string[];
    registerSection: (id: string, ref: RefObject<HTMLElement>) => void;
}
/**
 * Custom hook for tracking which sections are visible in the viewport
 * @param _sectionIds Array of section IDs to track
 * @param options Configuration options
 * @returns Object with visibleSections array and registerSection function
 */
export declare const useVisibleSections: (_sectionIds: string[], options?: {
    threshold: number;
}) => UseVisibleSectionsReturn;
export {};
