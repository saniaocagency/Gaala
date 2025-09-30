import React, { useEffect, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  opacity: number;
}

const MouseTrail: React.FC = () => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateTrail = () => {
      setTrail(prevTrail => {
        const newPoint: TrailPoint = {
          x: mouseX,
          y: mouseY,
          id: trailId++,
          opacity: 1
        };

        const updatedTrail = [newPoint, ...prevTrail.slice(0, 12)].map((point, index) => ({
          ...point,
          opacity: Math.max(0, 1 - (index / 12))
        }));
        
        return updatedTrail;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    const interval = setInterval(updateTrail, 30);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute rounded-full"
          style={{
            left: point.x - 6,
            top: point.y - 6,
            width: 12 - index * 0.8,
            height: 12 - index * 0.8,
            background: `radial-gradient(circle, rgba(212, 175, 55, ${point.opacity * 0.8}) 0%, rgba(255, 215, 119, ${point.opacity * 0.4}) 50%, transparent 100%)`,
            boxShadow: `0 0 ${8 - index * 0.5}px rgba(212, 175, 55, ${point.opacity * 0.6})`,
            transform: `scale(${1 - index * 0.05})`,
            transition: 'all 0.1s ease-out'
          }}
        />
      ))}
    </div>
  );
};

export default MouseTrail;