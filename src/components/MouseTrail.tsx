import React, { useEffect, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  opacity: number;
  size: number;
}

const MouseTrail: React.FC = () => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let trailId = 0;
    let moveTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      setIsMoving(true);
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => setIsMoving(false), 150);
    };

    const updateTrail = () => {
      setTrail(prevTrail => {
        if (!isMoving && prevTrail.length === 0) return prevTrail;
        
        const newPoint: TrailPoint = {
          x: mouseX,
          y: mouseY,
          id: trailId++,
          opacity: 1,
          size: isMoving ? 12 : 8
        };

        const maxTrailLength = isMoving ? 15 : 8;
        const updatedTrail = [newPoint, ...prevTrail.slice(0, maxTrailLength - 1)].map((point, index) => ({
          ...point,
          opacity: Math.max(0, 1 - (index / maxTrailLength)),
          size: Math.max(4, point.size - (index * 0.8))
        }));
        
        return updatedTrail;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    const interval = setInterval(updateTrail, 16); // 60fps

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
      clearTimeout(moveTimeout);
    };
  }, [isMoving]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute rounded-full transition-all duration-75 ease-out"
          style={{
            left: point.x - point.size / 2,
            top: point.y - point.size / 2,
            width: point.size,
            height: point.size,
            background: `radial-gradient(circle, rgba(212, 175, 55, ${point.opacity * 0.9}) 0%, rgba(255, 215, 119, ${point.opacity * 0.6}) 40%, rgba(255, 215, 119, ${point.opacity * 0.2}) 70%, transparent 100%)`,
            boxShadow: `0 0 ${point.size * 0.8}px rgba(212, 175, 55, ${point.opacity * 0.7}), 0 0 ${point.size * 1.5}px rgba(255, 215, 119, ${point.opacity * 0.3})`,
            transform: `scale(${1 - index * 0.03})`,
            filter: `blur(${index * 0.1}px)`
          }}
        />
      ))}
    </div>
  );
};

export default MouseTrail;