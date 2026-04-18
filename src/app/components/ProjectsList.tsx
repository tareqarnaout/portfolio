import { motion } from 'motion/react';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Data Science Competition CV',
    description:
      'Computer vision project for a data science competition with model training, data preprocessing, and evaluation workflows for image analysis.',
    tech: ['Python', 'TensorFlow', 'OpenCV'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    githubUrl: 'https://github.com/tareqarnaout/Data-Science-Competition-CV',
  },
  {
    id: '2',
    title: 'Database Management System',
    description:
      'Comprehensive database system featuring CRUD operations, indexing strategies, and scalable query processing.',
    tech: ['SQL', 'Database Design', 'Optimization'],
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=500&fit=crop',
    githubUrl: 'https://github.com/tareqarnaout/Database-Management-System',
  },
  {
    id: '3',
    title: 'Mustamer App',
    description:
      'Modern mobile app with user authentication, real-time synchronization, and a clean, intuitive experience.',
    tech: ['Mobile Development', 'API Integration', 'UI/UX'],
    image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&h=500&fit=crop',
    githubUrl: 'https://github.com/tareqarnaout/mustamer-app',
  },
  {
    id: '4',
    title: 'Web Project',
    description:
      'Full-stack web application with responsive UI, RESTful integration, authentication, and dynamic content rendering.',
    tech: ['HTML/CSS', 'JavaScript', 'Web Development'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop',
    githubUrl: 'https://github.com/tareqarnaout/WebProject',
  },
  {
    id: '5',
    title: 'Operating System Project',
    description:
      'Operating system concepts implementation covering process scheduling, memory management, and file operations.',
    tech: ['C/C++', 'Operating Systems', 'System Programming'],
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=500&fit=crop',
    githubUrl: 'https://github.com/tareqarnaout/osProject',
  },
  {
    id: '6',
    title: 'Todoey',
    description:
      'Productivity-focused todo app with task priorities, deadline tracking, and straightforward task organization.',
    tech: ['Mobile App', 'Task Management', 'Local Storage'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
    githubUrl: 'https://github.com/tareqarnaout/todoey',
  },
  {
    id: '7',
    title: 'OOP Pharmacy System',
    description:
      'Pharmacy management system built with object-oriented design including inventory, prescriptions, and customer management.',
    tech: ['OOP', 'Design Patterns', 'Database'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop',
    githubUrl: 'https://github.com/tareqarnaout/OOP-Pharmacy',
  },
];

export default function ProjectsList() {
  return (
    <section className="py-32 px-8 md:px-16 max-w-7xl mx-auto" id="projects">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-6xl md:text-8xl font-black mb-24 tracking-tighter"
      >
        FEATURED PROJECTS
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
            className="border border-black/10 bg-white/70 backdrop-blur-sm overflow-hidden group"
          >
            <div className="aspect-[16/10] overflow-hidden border-b border-black/10">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-bold uppercase tracking-widest text-black/40">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-black/50">
                  Featured Project
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                {project.title}
              </h3>

              <p className="text-base md:text-lg text-black/65 mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 border border-black/15 text-xs md:text-sm font-bold uppercase tracking-wide"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm md:text-base font-bold uppercase tracking-widest text-black hover:text-black/70 transition-colors"
              >
                View on GitHub
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
