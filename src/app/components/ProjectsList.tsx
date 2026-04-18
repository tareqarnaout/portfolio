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
    title: 'Data Science Competition CV',
    description:
      'Computer vision project for a data science competition. Implements machine learning algorithms and deep learning models for image classification and analysis.',
    tech: ['Python', 'TensorFlow', 'OpenCV'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
  },
  {
    id: '2',
    title: 'Database Management System',
    description:
      'A comprehensive database management system implementing CRUD operations, query optimization, and transaction management for scalable storage.',
    tech: ['SQL', 'Database Design', 'Optimization'],
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=500&fit=crop',
  },
  {
    id: '3',
    title: 'Mustamer App',
    description:
      'A modern mobile application featuring user authentication, real-time synchronization, and an intuitive interface.',
    tech: ['Mobile Development', 'API Integration', 'UI/UX'],
    image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&h=500&fit=crop',
  },
  {
    id: '4',
    title: 'Web Project',
    description:
      'A full-stack web application with responsive design, RESTful API integration, user authentication, and dynamic content rendering.',
    tech: ['HTML/CSS', 'JavaScript', 'Web Development'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop',
  },
  {
    id: '5',
    title: 'Operating System Project',
    description:
      'An operating systems project featuring process scheduling, memory management, and file system operations.',
    tech: ['C/C++', 'Operating Systems', 'System Programming'],
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=500&fit=crop',
  },
  {
    id: '6',
    title: 'Todoey',
    description:
      'A productivity-focused todo application with task management, priority settings, and deadline tracking.',
    tech: ['Mobile App', 'Task Management', 'Local Storage'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
  },
  {
    id: '7',
    title: 'OOP Pharmacy System',
    description:
      'A pharmacy management system built with object-oriented programming principles, including inventory and prescription handling.',
    tech: ['OOP', 'Design Patterns', 'Database'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop',
  },
];

export default function ProjectsList() {
  const listRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    const imageImg = imageImgRef.current;
    if (!image || !imageImg) return;

    const handleProjectHover = (_projectId: string, imageSrc: string) => {
      imageImg.src = imageSrc;

      gsap.to(image, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleProjectLeave = () => {
      gsap.to(image, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.in',
      });
    };

    const projectItems = listRef.current?.querySelectorAll('[data-project-id]');
    const cleanupCallbacks: Array<() => void> = [];

    projectItems?.forEach((item) => {
      const projectId = item.getAttribute('data-project-id') || '';
      const imageSrc = item.getAttribute('data-project-image') || '';
      const onMouseEnter = () => handleProjectHover(projectId, imageSrc);
      const onMouseLeave = () => handleProjectLeave();

      item.addEventListener('mouseenter', onMouseEnter);
      item.addEventListener('mouseleave', onMouseLeave);

      cleanupCallbacks.push(() => {
        item.removeEventListener('mouseenter', onMouseEnter);
        item.removeEventListener('mouseleave', onMouseLeave);
      });
    });

    return () => {
      cleanupCallbacks.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <section className="py-32 px-8 md:px-16 max-w-7xl mx-auto" id="projects">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
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
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
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

      <div
        ref={imageRef}
        className="fixed right-8 top-1/2 -translate-y-1/2 w-80 h-80 xl:w-96 xl:h-96 pointer-events-none z-40 opacity-0 hidden lg:block"
        style={{
          transformOrigin: 'center center',
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
