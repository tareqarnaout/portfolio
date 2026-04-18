import { useState } from 'react';
import { motion } from 'motion/react';
import CustomCursor from './components/CustomCursor';
import HamburgerButton from './components/HamburgerButton';
import OverlayMenu from './components/OverlayMenu';
import ProjectsList from './components/ProjectsList';

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