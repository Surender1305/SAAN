import { useEffect, useState, useRef } from 'react';

export default function MouseFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);
  const trailRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('magnetic-hover')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Smooth trail animation
  useEffect(() => {
    const animate = () => {
      trailRef.current.x += (position.x - trailRef.current.x) * 0.08;
      trailRef.current.y += (position.y - trailRef.current.y) * 0.08;
      setTrailPosition({ x: trailRef.current.x, y: trailRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [position]);

  if (!isVisible) return null;

  return (
    <>
      {/* Subtle trailing ring */}
      <div
        className="fixed pointer-events-none z-[9998] hidden md:block"
        style={{
          left: trailPosition.x,
          top: trailPosition.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.85 : isHovering ? 1.35 : 1})`,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="w-8 h-8 rounded-full border border-[#fd7200]/35 bg-[#fd7200]/[0.03]" />
      </div>

      {/* Soft ambient aura behind cursor */}
      <div
        className="fixed pointer-events-none z-[9997] hidden md:block"
        style={{
          left: trailPosition.x,
          top: trailPosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className="w-[240px] h-[240px] rounded-full opacity-[0.06]"
          style={{
            background: 'radial-gradient(circle, rgba(253,114,0,0.75) 0%, rgba(1,31,75,0.35) 45%, transparent 70%)',
          }}
        />
      </div>
    </>
  );
}
