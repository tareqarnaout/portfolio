import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface OverlayMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OverlayMenu({ isOpen, onClose }: OverlayMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const items = itemsRef.current;

    if (!overlay) return;

    if (isOpen) {
      // Open animation
      gsap.set(overlay, { display: 'flex' });
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );

      // Staggered items reveal
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.2,
        }
      );
    } else {
      // Close animation
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
        },
      });
    }
  }, [isOpen]);

  const menuItems = [
    { label: 'WORK', href: '#work' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/95 z-50 hidden items-center justify-center"
      onClick={onClose}
    >
      <nav className="text-center">
        <ul className="space-y-8">
          {menuItems.map((item, index) => (
            <li
              key={item.label}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
            >
              <a
                href={item.href}
                className="text-white text-6xl md:text-8xl font-black tracking-tight hover:text-gray-300 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
