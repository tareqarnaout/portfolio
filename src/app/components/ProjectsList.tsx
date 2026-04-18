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

      <div className="space-y-12">
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
            className="border-t border-black/10 pt-12 group"
          >
            <div className="flex items-start justify-between gap-10 lg:gap-12">
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

              <div className="hidden lg:block w-72 xl:w-80 shrink-0">
                <div className="relative overflow-hidden rounded-sm border border-black/10 bg-white/60 p-2 shadow-lg opacity-0 scale-[0.96] translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-[4/3] object-cover rounded-[2px]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
