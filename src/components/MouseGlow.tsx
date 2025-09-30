import React, { useEffect, useState, useRef } from 'react';

const MouseGlow: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    let isMoving = false;
    let hideTimeout: NodeJS.Timeout;

    const updateGlowPosition = () => {
      if (glowRef.current && isMoving) {
        glowRef.current.style.transform = `translate(${mousePosition.x - 200}px, ${mousePosition.y - 200}px)`;
      }
      animationFrameRef.current = requestAnimationFrame(updateGlowPosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (!isMoving) {
        setIsVisible(true);
        isMoving = true;
        animationFrameRef.current = requestAnimationFrame(updateGlowPosition);
      }

      // Clear existing timeout
      clearTimeout(hideTimeout);
      
      // Set new timeout to hide glow after mouse stops
      hideTimeout = setTimeout(() => {
        setIsVisible(false);
        isMoving = false;
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      }, 100);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      isMoving = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(hideTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <div
      ref={glowRef}
      className={`fixed pointer-events-none z-0 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(255, 215, 119, 0.04) 25%, rgba(212, 175, 55, 0.02) 50%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        transform: `translate(${mousePosition.x - 200}px, ${mousePosition.y - 200}px)`,
      }}
    />
  );
};

export default MouseGlow;