import { useState } from 'react';
import { Monitor, Code2, Cpu, Zap, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import CustomCursor from './components/CustomCursor';
import HamburgerButton from './components/HamburgerButton';
import OverlayMenu from './components/OverlayMenu';
import ProjectsList from './components/ProjectsList';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE5F1] via-[#FAFBFC] to-[#E5F4FF] font-['Inter',sans-serif] overflow-x-hidden">
      <CustomCursor />
      <HamburgerButton onClick={() => setMenuOpen(true)} />
      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-8 relative overflow-hidden">
        {/* Animated Tech Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-[10%] opacity-20 animate-float" style={{ animationDelay: '0s' }}>
            <Monitor size={80} strokeWidth={1.5} />
          </div>
          <div className="absolute top-40 right-[15%] opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>
            <Code2 size={100} strokeWidth={1.5} />
          </div>
          <div className="absolute bottom-32 left-[20%] opacity-20 animate-float" style={{ animationDelay: '1s' }}>
            <Cpu size={90} strokeWidth={1.5} />
          </div>
          <div className="absolute top-[60%] right-[10%] opacity-20 animate-float" style={{ animationDelay: '1.5s' }}>
            <Zap size={70} strokeWidth={1.5} />
          </div>
          <div className="absolute bottom-20 right-[25%] opacity-20 animate-float" style={{ animationDelay: '2s' }}>
            <Globe size={85} strokeWidth={1.5} />
          </div>
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
            Specializing in High-Performance Computing, low-level systems (C++/CUDA), and AI architectures
          </p>
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