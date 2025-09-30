import React, { useEffect, useState, useRef } from 'react';

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
};

// Animation component
interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeInUp: React.FC<FadeInUpProps> = ({ children, delay = 0, className = "" }) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-300 ease-out ${
        isIntersecting 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-4 opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default FadeInUp;