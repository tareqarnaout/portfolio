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
              className={`absolute ${icon.className} animate-drift-x text-black/20`}
              style={{
                animationDelay: icon.delay,
                animationDuration: `calc(${icon.duration} + 2.2s)`,
              }}
            >
              <div
                className="w-full h-full animate-float"
                style={{
                  animationDelay: icon.delay,
                  animationDuration: icon.duration,
                }}
              >
                <SoftwareIcon type={icon.type} />
              </div>
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

      {/* Interactive SVG Navigator */}
      <section className="px-4 md:px-8 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto rounded-[28px] bg-[#f1f3f6]/90 border border-black/10 overflow-hidden relative">
          <div className="relative h-[420px] md:h-[560px]">
            <svg
              viewBox="0 0 1200 650"
              className="absolute inset-0 w-full h-full"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="armPipe" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#c8cbd3" />
                  <stop offset="100%" stopColor="#8f95a3" />
                </linearGradient>
                <linearGradient id="orbGlass" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#a7dff4" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#6fb5d1" stopOpacity="0.95" />
                </linearGradient>
                <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path d="M600 0 v85 c0 24 18 34 35 34 h36 c24 0 35 14 35 32 v14 c0 18-11 31-35 31 h-60 c-23 0-34 12-34 30" fill="none" stroke="#a7abb2" strokeWidth="7" strokeLinecap="round" />

              <path d="M375 275 C450 250 505 275 540 315" fill="none" stroke="url(#armPipe)" strokeWidth="12" strokeLinecap="round" />
              <path d="M825 275 C750 250 695 275 660 315" fill="none" stroke="url(#armPipe)" strokeWidth="12" strokeLinecap="round" />
              <path d="M390 450 C470 470 525 450 555 420" fill="none" stroke="url(#armPipe)" strokeWidth="12" strokeLinecap="round" />
              <path d="M810 450 C730 470 675 450 645 420" fill="none" stroke="url(#armPipe)" strokeWidth="12" strokeLinecap="round" />

              <circle cx="600" cy="360" r="145" fill="url(#orbGlass)" stroke="#68b1cd" strokeWidth="10" filter="url(#softGlow)" />
              <ellipse cx="600" cy="320" rx="88" ry="62" fill="#f7c9de" opacity="0.9" />
              <path d="M545 320 q20-24 40 0 q20 24 40 0 q20-24 40 0" fill="none" stroke="#e9a1c4" strokeWidth="8" strokeLinecap="round" />
              <path d="M525 355 q25-20 50 4 q25 24 50 0 q25-24 50 4" fill="none" stroke="#d38bb4" strokeWidth="7" strokeLinecap="round" />

              <ellipse cx="555" cy="280" rx="52" ry="16" fill="#ffffff" opacity="0.35" transform="rotate(-22 555 280)" />
              <ellipse cx="640" cy="430" rx="72" ry="10" fill="#ffffff" opacity="0.25" />

              <circle cx="495" cy="272" r="6" fill="#bcc1c9" />
              <circle cx="705" cy="272" r="6" fill="#bcc1c9" />
              <circle cx="470" cy="458" r="6" fill="#bcc1c9" />
              <circle cx="730" cy="458" r="6" fill="#bcc1c9" />

              <circle cx="890" cy="170" r="4" fill="#f06292" className="animate-float" />
              <circle cx="920" cy="250" r="3" fill="#5ec2ee" className="animate-float" style={{ animationDelay: '0.6s' }} />
              <circle cx="308" cy="220" r="4" fill="#ffd54f" className="animate-float" style={{ animationDelay: '1s' }} />
              <circle cx="280" cy="470" r="5" fill="#31c06b" className="animate-float" style={{ animationDelay: '0.3s' }} />
            </svg>

            <motion.a
              href="#projects"
              whileHover={{ scale: 1.06, x: 4 }}
              className="absolute right-[8%] top-[26%] text-4xl md:text-6xl font-black tracking-tight text-[#ef3f36]"
            >
              PROJECTS
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.06, x: 4 }}
              className="absolute left-[8%] top-[62%] text-4xl md:text-6xl font-black tracking-tight text-[#089a4f]"
            >
              CONTACT
            </motion.a>

            <motion.a
              href="#skills"
              whileHover={{ scale: 1.06, x: 4 }}
              className="absolute left-[10%] top-[30%] text-3xl md:text-5xl font-black tracking-tight text-[#f0bf29]"
            >
              ABOUT
            </motion.a>
          </div>
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
        id="contact"
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