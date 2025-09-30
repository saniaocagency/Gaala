import React, { useEffect, useState, useRef, useCallback } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  timestamp: number;
  velocity: number;
}

const MouseTrail: React.FC = () => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(0);
  const trailIdRef = useRef(0);
  const animationFrameRef = useRef<number>();

  const calculateVelocity = useCallback((x: number, y: number, currentTime: number) => {
    const deltaX = x - lastPositionRef.current.x;
    const deltaY = y - lastPositionRef.current.y;
    const deltaTime = currentTime - lastTimeRef.current;
    
    if (deltaTime === 0) return 0;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    return Math.min(distance / deltaTime, 2); // Cap velocity for smoother effect
  }, []);

  const updateTrail = useCallback(() => {
    const currentTime = Date.now();
    
    setTrail(prevTrail => {
      // Remove old points (older than 800ms)
      const filteredTrail = prevTrail.filter(point => 
        currentTime - point.timestamp < 800
      );
      
      // Update opacity based on age
      return filteredTrail.map(point => ({
        ...point,
        // Opacity decreases over time
      }));
    });

    animationFrameRef.current = requestAnimationFrame(updateTrail);
  }, []);

  useEffect(() => {
    let isMoving = false;
    let moveTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      const velocity = calculateVelocity(e.clientX, e.clientY, currentTime);
      
      // Only show trail when moving with sufficient velocity
      if (velocity > 0.1) {
        setIsVisible(true);
        isMoving = true;
        
        setTrail(prevTrail => {
          const newPoint: TrailPoint = {
            x: e.clientX,
            y: e.clientY,
            id: trailIdRef.current++,
            timestamp: currentTime,
            velocity
          };

          // Limit trail length based on velocity
          const maxLength = Math.min(12 + Math.floor(velocity * 8), 20);
          return [newPoint, ...prevTrail.slice(0, maxLength - 1)];
        });

        lastPositionRef.current = { x: e.clientX, y: e.clientY };
        lastTimeRef.current = currentTime;
      }

      // Clear move timeout and set new one
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        isMoving = false;
        setIsVisible(false);
      }, 100);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setTrail([]);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(updateTrail);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(moveTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [calculateVelocity, updateTrail]);

  if (!isVisible || trail.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {trail.map((point, index) => {
        const age = Date.now() - point.timestamp;
        const ageRatio = Math.max(0, 1 - age / 800); // Fade over 800ms
        const sizeMultiplier = 0.8 + (point.velocity * 0.4); // Size based on velocity
        const baseSize = 8 * sizeMultiplier * ageRatio;
        
        return (
          <div
            key={point.id}
            className="absolute rounded-full transition-opacity duration-75 ease-out"
            style={{
              left: point.x - baseSize / 2,
              top: point.y - baseSize / 2,
              width: baseSize,
              height: baseSize,
              background: `radial-gradient(circle, rgba(212, 175, 55, ${ageRatio * 0.8}) 0%, rgba(255, 215, 119, ${ageRatio * 0.5}) 40%, rgba(255, 215, 119, ${ageRatio * 0.2}) 70%, transparent 100%)`,
              boxShadow: `0 0 ${baseSize * 0.8}px rgba(212, 175, 55, ${ageRatio * 0.6}), 0 0 ${baseSize * 1.5}px rgba(255, 215, 119, ${ageRatio * 0.3})`,
              transform: `scale(${1 - index * 0.05})`,
              filter: `blur(${index * 0.2}px)`,
              opacity: ageRatio
            }}
          />
        );
      })}
    </div>
  );
};

export default MouseTrail;