import { useEffect } from 'react';

const SmoothScroll: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelectorAll('.parallax');
      
      parallax.forEach((element) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
};

export default SmoothScroll;