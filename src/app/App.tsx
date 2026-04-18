import { useState } from 'react';
import { motion } from 'motion/react';
import CustomCursor from './components/CustomCursor';
import HamburgerButton from './components/HamburgerButton';
import OverlayMenu from './components/OverlayMenu';
import ProjectsList from './components/ProjectsList';

type FloatingIconType = 'code' | 'terminal' | 'gear' | 'api' | 'chip';

const floatingIcons: Array<{
  id: string;
  type: FloatingIconType;
  className: string;
  delay: string;
  duration: string;
}> = [
    {
      id: 'icon-code',
      type: 'code',
      className: 'left-[7%] top-[18%] w-14 h-14 md:w-16 md:h-16',
      delay: '0.2s',
      duration: '6.5s',
    },
    {
      id: 'icon-terminal',
      type: 'terminal',
      className: 'right-[12%] top-[20%] w-12 h-12 md:w-14 md:h-14',
      delay: '1s',
      duration: '7.2s',
    },
    {
      id: 'icon-gear',
      type: 'gear',
      className: 'left-[14%] bottom-[16%] w-14 h-14 md:w-[68px] md:h-[68px]',
      delay: '1.6s',
      duration: '8s',
    },
    {
      id: 'icon-api',
      type: 'api',
      className: 'right-[9%] bottom-[22%] w-14 h-14 md:w-16 md:h-16',
      delay: '0.8s',
      duration: '6.8s',
    },
    {
      id: 'icon-chip',
      type: 'chip',
      className: 'left-1/2 top-[10%] -translate-x-1/2 w-10 h-10 md:w-12 md:h-12',
      delay: '1.2s',
      duration: '7.6s',
    },
  ];

function SoftwareIcon({ type }: { type: FloatingIconType }) {
  switch (type) {
    case 'code':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-full h-full">
          <path d="M8 7 4 12l4 5M16 7l4 5-4 5M14 4l-4 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'terminal':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-full h-full">
          <rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="m8 10 2 2-2 2M12.5 14H16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'gear':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-full h-full">
          <path d="M10.9 2.6h2.2l.6 2.1a7.6 7.6 0 0 1 1.8.8l2-1.1 1.5 1.5-1.1 2c.3.6.6 1.2.8 1.8l2.1.6v2.2l-2.1.6a7.6 7.6 0 0 1-.8 1.8l1.1 2-1.5 1.5-2-1.1a7.6 7.6 0 0 1-1.8.8l-.6 2.1h-2.2l-.6-2.1a7.6 7.6 0 0 1-1.8-.8l-2 1.1-1.5-1.5 1.1-2a7.6 7.6 0 0 1-.8-1.8l-2.1-.6v-2.2l2.1-.6c.2-.6.5-1.2.8-1.8l-1.1-2 1.5-1.5 2 1.1c.6-.3 1.2-.6 1.8-.8l.6-2.1Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="2.7" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case 'api':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-full h-full">
          <path d="M6 8h12M6 12h8M6 16h10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="17.5" cy="12" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case 'chip':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-full h-full">
          <rect x="7" y="7" width="10" height="10" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="10" y="10" width="4" height="4" rx="0.8" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const skills = [
    'Python',
    'JavaScript',
    'ASP.NET',
    'Flutter',
    'C++',
    'SQL',
    'HTML',
    'CSS',
    'PHP',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE5F1] via-[#FAFBFC] to-[#E5F4FF] font-['Inter',sans-serif] overflow-x-hidden">
      <CustomCursor />
      <HamburgerButton onClick={() => setMenuOpen(true)} />
      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {floatingIcons.map((icon) => (
            <div
              key={icon.id}
              className={`absolute ${icon.className} animate-float text-black/20`}
              style={{
                animationDelay: icon.delay,
                animationDuration: icon.duration,
              }}
            >
              <SoftwareIcon type={icon.type} />
            </div>
          ))}
        </div>

        <div className="text-center relative z-10">
          <div className="overflow-hidden">
            <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tighter leading-none animate-slide-up">
              HEY, I'M
              <br />
              <span className="block mt-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>TAREQ</span>
            </h1>
          </div>
          <div className="overflow-hidden">
            <h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mt-8 animate-slide-up"
              style={{
                WebkitTextStroke: '2px black',
                WebkitTextFillColor: 'transparent',
                paintOrder: 'stroke fill',
                animationDelay: '0.4s',
              }}
            >
              SOFTWARE ENGINEER
            </h2>
          </div>
          <p className="text-xl md:text-2xl mt-12 text-black/60 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
            Because great code is where innovation meets execution
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">Tech Stack</h2>
            <p className="text-black/60 mt-4 text-lg md:text-xl">
              These are the core technologies I use to build practical, production-ready software.
            </p>
          </motion.div>

          <div className="mt-12 flex flex-wrap gap-4">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-full border border-black/15 bg-white/80 px-5 py-2 text-sm md:text-base font-bold tracking-wide"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsList />

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-16 px-8 border-t border-black/10"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-sm text-black/40 uppercase tracking-widest font-bold">
            © 2026 Tareq
          </p>
          <div className="flex gap-8">
            <a
              href="https://github.com"
              className="text-sm text-black/60 hover:text-black uppercase tracking-widest font-bold transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              className="text-sm text-black/60 hover:text-black uppercase tracking-widest font-bold transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:hello@tareq.dev"
              className="text-sm text-black/60 hover:text-black uppercase tracking-widest font-bold transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}