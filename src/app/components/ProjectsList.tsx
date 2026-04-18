import { motion } from 'motion/react';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  category: 'AI / ML' | 'Database' | 'Mobile' | 'Web' | 'Systems';
  githubUrl: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Data Science Competition CV',
    description:
      'Computer vision project for a data science competition. Implements machine learning algorithms and deep learning models for image classification and analysis.',
    tech: ['Python', 'TensorFlow', 'OpenCV'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    category: 'AI / ML',
    githubUrl: 'https://github.com/tareqarnaout/Data-Science-Competition-CV',
  },
  {
    id: '2',
    title: 'Database Management System',
    description:
      'A comprehensive database management system implementing CRUD operations, query optimization, and transaction management for scalable storage.',
    tech: ['SQL', 'Database Design', 'Optimization'],
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=500&fit=crop',
    category: 'Database',
    githubUrl: 'https://github.com/tareqarnaout/Database-Management-System',
  },
  {
    id: '3',
    title: 'Mustamer App',
    description:
      'A modern mobile application featuring user authentication, real-time synchronization, and an intuitive interface.',
    tech: ['Mobile Development', 'API Integration', 'UI/UX'],
    image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&h=500&fit=crop',
    category: 'Mobile',
    githubUrl: 'https://github.com/tareqarnaout/mustamer-app',
  },
  {
    id: '4',
    title: 'Web Project',
    description:
      'A full-stack web application with responsive design, RESTful API integration, user authentication, and dynamic content rendering.',
    tech: ['HTML/CSS', 'JavaScript', 'Web Development'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop',
    category: 'Web',
    githubUrl: 'https://github.com/tareqarnaout/WebProject',
  },
  {
    id: '5',
    title: 'Operating System Project',
    description:
      'An operating systems project featuring process scheduling, memory management, and file system operations.',
    tech: ['C/C++', 'Operating Systems', 'System Programming'],
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=500&fit=crop',
    category: 'Systems',
    githubUrl: 'https://github.com/tareqarnaout/osProject',
  },
  {
    id: '6',
    title: 'Todoey',
    description:
      'A productivity-focused todo application with task management, priority settings, and deadline tracking.',
    tech: ['Mobile App', 'Task Management', 'Local Storage'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
    category: 'Mobile',
    githubUrl: 'https://github.com/tareqarnaout/todoey',
  },
  {
    id: '7',
    title: 'OOP Pharmacy System',
    description:
      'A pharmacy management system built with object-oriented programming principles, including inventory and prescription handling.',
    tech: ['OOP', 'Design Patterns', 'Database'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop',
    category: 'Systems',
    githubUrl: 'https://github.com/tareqarnaout/OOP-Pharmacy',
  },
];

function getCategoryStyles(category: Project['category']) {
  switch (category) {
    case 'AI / ML':
      return {
        badge: 'bg-pink-100 text-pink-700 border-pink-200',
        number: 'text-pink-200',
      };
    case 'Database':
      return {
        badge: 'bg-amber-100 text-amber-700 border-amber-200',
        number: 'text-amber-200',
      };
    case 'Mobile':
      return {
        badge: 'bg-cyan-100 text-cyan-700 border-cyan-200',
        number: 'text-cyan-200',
      };
    case 'Web':
      return {
        badge: 'bg-violet-100 text-violet-700 border-violet-200',
        number: 'text-violet-200',
      };
    case 'Systems':
      return {
        badge: 'bg-lime-100 text-lime-700 border-lime-200',
        number: 'text-lime-200',
      };
    default:
      return {
        badge: 'bg-gray-100 text-gray-700 border-gray-200',
        number: 'text-gray-200',
      };
  }
}

export default function ProjectsList() {
  return (
    <section className="py-28 px-8 md:px-16 max-w-7xl mx-auto" id="projects">
      <div className="mb-12 md:mb-16">
        <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-black/40">
          Selected Work - 2024/25
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.92]"
        >
          SELECTED
          <br />
          <span
            style={{
              WebkitTextStroke: '2px #111',
              WebkitTextFillColor: 'transparent',
              paintOrder: 'stroke fill',
            }}
          >
            PROJECTS
          </span>
        </motion.h2>

        <div className="mt-8 flex flex-wrap gap-3 text-xs md:text-sm font-bold uppercase tracking-widest">
          <span className="px-4 py-2 bg-black text-white">All</span>
          <span className="px-4 py-2 border border-black/15 text-black/50">AI / ML</span>
          <span className="px-4 py-2 border border-black/15 text-black/50">Database</span>
          <span className="px-4 py-2 border border-black/15 text-black/50">Mobile</span>
          <span className="px-4 py-2 border border-black/15 text-black/50">Web</span>
          <span className="px-4 py-2 border border-black/15 text-black/50">Systems</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-6">
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
            className="group [perspective:1200px]"
          >
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="block relative h-[330px]"
            >
              <div className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.2,0.75,0.2,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 border border-black/10 bg-white/70 p-5 md:p-6 [backface-visibility:hidden] overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#111_1px,transparent_1px)] [background-size:14px_14px]" />

                  <div className="relative h-full flex flex-col">
                    <div className="flex items-start justify-between mb-7">
                      <span className={`text-5xl font-black leading-none ${getCategoryStyles(project.category).number}`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className={`text-[10px] px-3 py-1 border font-bold uppercase tracking-widest ${getCategoryStyles(project.category).badge}`}>
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-4xl md:text-[2.2rem] leading-[0.95] font-black tracking-tight mb-6">
                      {project.title}
                    </h3>

                    <div className="mt-auto">
                      <div className="text-[11px] uppercase tracking-[0.18em] text-black/45 font-bold flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                      <div className="mt-3 border-t border-black/10 pt-3 text-[11px] uppercase tracking-[0.22em] text-black/35 font-bold">
                        Hover to flip
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-black/70" />

                  <div className="relative h-full p-5 md:p-6 text-white flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] px-3 py-1 border border-white/30 bg-white/10 font-bold uppercase tracking-widest">
                        {project.category}
                      </span>
                      <span className="text-xs font-bold text-white/70">
                        {String(index + 1).padStart(2, '0')}/{String(projects.length).padStart(2, '0')}
                      </span>
                    </div>

                    <h4 className="text-3xl font-black leading-[0.95] tracking-tight mb-3">
                      {project.title}
                    </h4>

                    <p className="text-sm text-white/85 leading-relaxed mb-4 line-clamp-5">
                      {project.description}
                    </p>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] px-2.5 py-1 border border-white/30 bg-white/10 font-bold uppercase tracking-wide"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-white/90">
                        View Project
                        <span aria-hidden="true">{'->'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <a
          href="https://github.com/tareqarnaout"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border border-black/40 px-7 py-3 text-sm md:text-base font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
        >
          View All On GitHub
          <span aria-hidden="true">{'->'}</span>
        </a>
      </div>
    </section>
  );
}
