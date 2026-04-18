import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { motion } from 'motion/react';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'SENTINEL AI AGENT',
    description: 'Multi-threaded anomaly detection system using CUDA-accelerated neural networks',
    tech: ['C++', 'CUDA', 'TensorRT', 'Python'],
    image: 'https://images.unsplash.com/photo-1717501219263-9aa2d6a768d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: '2',
    title: 'MPI SCIENTIFIC SIMULATOR',
    description: 'Distributed parallel computing framework for fluid dynamics simulations',
    tech: ['C++', 'MPI', 'OpenMP', 'HDF5'],
    image: 'https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: '3',
    title: 'C++ CONTAINER BENCHMARKS',
    description: 'Performance analysis suite for STL and custom data structures',
    tech: ['C++17', 'Google Benchmark', 'Perf', 'Valgrind'],
    image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: '4',
    title: 'QUANTUM CIRCUIT OPTIMIZER',
    description: 'Gate-level optimization engine for quantum computing algorithms',
    tech: ['C++', 'Eigen', 'BLAS', 'Python'],
    image: 'https://images.unsplash.com/photo-1752451399417-eb6e072269bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
];

export default function ProjectsList() {
  const listRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageImgRef = useRef<HTMLImageElement>(null);
  const currentProjectRef = useRef<string | null>(null);

  useEffect(() => {
    const image = imageRef.current;
    const imageImg = imageImgRef.current;
    if (!image || !imageImg) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (currentProjectRef.current) {
        gsap.to(image, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    };

    const handleProjectHover = (projectId: string, imageSrc: string) => {
      currentProjectRef.current = projectId;
      imageImg.src = imageSrc;

      gsap.to(image, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleProjectLeave = () => {
      currentProjectRef.current = null;

      gsap.to(image, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.in',
      });
    };

    // Attach hover listeners to project items
    const projectItems = listRef.current?.querySelectorAll('[data-project-id]');
    projectItems?.forEach((item) => {
      const projectId = item.getAttribute('data-project-id') || '';
      const imageSrc = item.getAttribute('data-project-image') || '';

      item.addEventListener('mouseenter', () => handleProjectHover(projectId, imageSrc));
      item.addEventListener('mouseleave', handleProjectLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      projectItems?.forEach((item) => {
        const projectId = item.getAttribute('data-project-id') || '';
        const imageSrc = item.getAttribute('data-project-image') || '';

        item.removeEventListener('mouseenter', () => handleProjectHover(projectId, imageSrc));
        item.removeEventListener('mouseleave', handleProjectLeave);
      });
    };
  }, []);

  return (
    <section className="py-32 px-8 md:px-16 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-6xl md:text-8xl font-black mb-24 tracking-tighter"
      >
        SELECTED WORK
      </motion.h2>

      <div ref={listRef} className="space-y-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
            data-project-id={project.id}
            data-project-image={project.image}
            className="border-t border-black/10 pt-12 cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-2xl font-bold text-black/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-4xl md:text-6xl font-black tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                    {project.title}
                  </h3>
                </div>
                <p className="text-lg md:text-xl text-black/60 mb-6 max-w-2xl">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-black text-white text-sm font-bold uppercase tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Image Follower */}
      <div
        ref={imageRef}
        className="fixed w-96 h-96 pointer-events-none z-40 opacity-0"
        style={{
          left: '-192px',
          top: '-192px',
          transform: 'translate(0, 0)',
        }}
      >
        <img
          ref={imageImgRef}
          src=""
          alt=""
          className="w-full h-full object-cover shadow-2xl"
        />
      </div>
    </section>
  );
}
