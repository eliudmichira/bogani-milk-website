import { useState, useEffect, useCallback } from 'react';
import type { RefObject } from 'react';

// Update the type to be more flexible with null values
type HTMLElementRef = RefObject<HTMLElement | null>;

export const useVisibleSections = () => {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [sectionRefs, setSectionRefs] = useState<Record<string, HTMLElementRef>>({});

  const registerSection = useCallback((id: string, ref: HTMLElementRef) => {
    setSectionRefs(prev => ({
      ...prev,
      [id]: ref
    }));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-section-id');
          if (id) {
            if (entry.isIntersecting) {
              setVisibleSections(prev => 
                prev.includes(id) ? prev : [...prev, id]
              );
            } else {
              setVisibleSections(prev => 
                prev.filter(sectionId => sectionId !== id)
              );
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    // Set up observers on all section refs
    Object.entries(sectionRefs).forEach(([id, ref]) => {
      if (ref.current) {
        ref.current.setAttribute('data-section-id', id);
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionRefs]);

  return { visibleSections, registerSection };
}; 