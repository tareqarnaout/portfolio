import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Keep native cursor for touch/coarse pointers.
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    let isNativeCursorHidden = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isNativeCursorHidden) {
        // Hide native cursor only after first move so user never loses cursor visibility.
        document.body.style.cursor = 'none';
        isNativeCursorHidden = true;
        gsap.to(cursor, { autoAlpha: 1, duration: 0.15, ease: 'power2.out' });
      }

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        gsap.to(cursor, {
          scale: 2,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      if (isNativeCursorHidden) {
        document.body.style.cursor = 'auto';
      }
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed w-6 h-6 rounded-full pointer-events-none z-[9999] border-2 border-black bg-white/30 shadow-[0_0_0_1px_rgba(255,255,255,0.9)]"
      style={{
        left: '-12px',
        top: '-12px',
        opacity: 0,
        transform: 'translate(0, 0)',
      }}
    />
  );
}
