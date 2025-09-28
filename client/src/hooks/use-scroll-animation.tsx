import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options;

  // Adjust settings for mobile devices
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const mobileThreshold = isMobile ? 0.05 : threshold;
  const mobileRootMargin = isMobile ? '0px 0px -30px 0px' : rootMargin;

  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold: mobileThreshold,
        rootMargin: mobileRootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [mobileThreshold, mobileRootMargin, triggerOnce]);

  return { elementRef, isVisible };
}

// Hook for multiple elements
export function useScrollAnimationMultiple(
  count: number,
  options: UseScrollAnimationOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options;

  // Adjust settings for mobile devices
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const mobileThreshold = isMobile ? 0.05 : threshold;
  const mobileRootMargin = isMobile ? '0px 0px -30px 0px' : rootMargin;

  const elementRefs = useRef<(HTMLElement | null)[]>([]);
  const [visibleElements, setVisibleElements] = useState<boolean[]>(
    new Array(count).fill(false)
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    elementRefs.current.forEach((element, index) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
            if (triggerOnce) {
              observer.unobserve(element);
            }
          } else if (!triggerOnce) {
            setVisibleElements(prev => {
              const newState = [...prev];
              newState[index] = false;
              return newState;
            });
          }
        },
        {
          threshold: mobileThreshold,
          rootMargin: mobileRootMargin,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [count, mobileThreshold, mobileRootMargin, triggerOnce]);

  const setElementRef = (index: number) => (element: HTMLElement | null) => {
    elementRefs.current[index] = element;
  };

  return { setElementRef, visibleElements };
}
