import { useCallback, useEffect, useState, type RefObject } from 'react';

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
export const useVisibleSections = (
  _sectionIds: string[],
  options = { threshold: 0.2 }
): UseVisibleSectionsReturn => {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [sectionRefs, setSectionRefs] = useState<Record<string, RefObject<HTMLElement>>>({});

  // Register a section with its ref
  const registerSection = useCallback((id: string, ref: RefObject<HTMLElement>) => {
    setSectionRefs(prev => ({ ...prev, [id]: ref }));
  }, []);

  // Set up the Intersection Observer
  useEffect(() => {
    // Only run if we have sections registered
    if (Object.keys(sectionRefs).length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      const visibleIds = entries.reduce((acc: string[], entry) => {
        const id = Object.keys(sectionRefs).find(
          id => sectionRefs[id].current === entry.target
        );

        if (id && entry.isIntersecting) {
          return [...acc, id];
        }
        return acc;
      }, []);

      setVisibleSections(prev => {
        // Keep previously visible sections if they're not being observed now
        const stillVisible = prev.filter(id => 
          !Object.keys(sectionRefs).includes(id) || visibleIds.includes(id)
        );
        
        // Add newly visible sections
        const newVisible = visibleIds.filter(id => !stillVisible.includes(id));
        
        return [...stillVisible, ...newVisible];
      });
    }, { threshold: options.threshold });

    // Start observing all section refs
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [sectionRefs, options.threshold]);

  return { visibleSections, registerSection };
};