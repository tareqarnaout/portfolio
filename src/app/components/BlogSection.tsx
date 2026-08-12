import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Clock3, Github, X } from 'lucide-react';
import { trackPageView } from '../lib/goatCounter';

type Post = {
  id: string;
  number: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  accent: string;
  stack: string[];
  repository?: string;
  sections: Array<{
    heading: string;
    body: string | string[];
    bullets?: Array<{ label: string; text: string }>;
    figures?: Array<{
      src: string;
      alt: string;
      caption: string;
      compact?: boolean;
    }>;
  }>;
};

const articleAsset = (filename: string) =>
  `${import.meta.env.BASE_URL}blog/maximal-clique-enumeration-parallel/${filename}`;

const posts: Post[] = [
  {
    id: 'maximal-clique-enumeration-parallel',
    number: '01',
    title: 'Maximal Clique Enumeration Parallel',
    excerpt: 'Parallelizing the Bron–Kerbosch algorithm with a task queue on a 32-core CPU—and reaching a 20× speedup in one test case.',
    category: 'Parallel computing',
    date: 'Aug 2026',
    readTime: '4 min read',
    accent: 'bg-[#ff6b9f]',
    stack: ['C++', 'OpenMP', 'Graph algorithms'],
    repository: 'https://github.com/tareqarnaout/maximal-clique-enumeration',
    sections: [
      {
        heading: 'The problem',
        body: [
          'I implemented the Bron–Kerbosch algorithm in C++. The sequential version follows the standard recursive approach: it explores the graph and enumerates every possible maximal clique.',
          'Consider a graph with four vertices where {0, 1, 2} and {0, 1, 3} are maximal cliques.',
        ],
        figures: [
          {
            src: articleAsset('example-graph.png'),
            alt: 'A four-vertex graph with maximal cliques 0, 1, 2 and 0, 1, 3',
            caption: 'Figure 1 — Example graph with two maximal cliques.',
          },
        ],
      },
      {
        heading: 'How it works',
        body: [
          'We begin with every vertex in P, while R and X are empty. When both P and X are empty, R is a maximal clique.',
          'For each vertex v in P, the algorithm adds v to a new R, intersects P and X with the neighbors of v, and recursively calls Bron–Kerbosch. Once that call finishes, v moves from P to X so later branches do not produce the same maximal clique.',
        ],
        bullets: [
          { label: 'R', text: 'vertices already chosen for the current clique' },
          { label: 'P', text: 'vertices that can still be added to R' },
          { label: 'X', text: 'vertices already considered, preventing duplicate cliques' },
        ],
        figures: [
          {
            src: articleAsset('algorithm-walkthrough.png'),
            alt: 'Step-by-step Bron–Kerbosch traversal of the example graph',
            caption: 'Figure 2 — Bron–Kerbosch traversal of the example graph.',
          },
        ],
      },
      {
        heading: 'Why parallelize?',
        body: 'Maximal clique enumeration is computationally expensive. In the worst case, the number of maximal cliques grows exponentially, so I explored whether parallel execution could reduce the runtime.',
        figures: [
          {
            src: articleAsset('worst-case-complexity.png'),
            alt: 'Three to the power of n over three, the worst-case number of maximal cliques',
            caption: 'Worst-case growth in the number of maximal cliques.',
            compact: true,
          },
        ],
      },
      {
        heading: 'Task-based parallelism',
        body: [
          'I ran the algorithm on a 32-core CPU using 32 threads. During the first iteration, every Bron–Kerbosch call becomes a task in a shared queue.',
          'For the first two levels of the recursion tree, branches with many neighbors also become tasks. This spreads the largest early branches across threads while limiting task-creation overhead. A heavy branch can still appear deeper in the tree, but creating tasks at every depth would cost more than it saves.',
        ],
        figures: [
          {
            src: articleAsset('task-management.png'),
            alt: 'Diagram showing OpenMP task creation and thread management across the recursion tree',
            caption: 'Task management across the first levels of the recursion tree.',
          },
        ],
      },
      {
        heading: 'The result',
        body: 'In one test case, the parallel implementation reduced the runtime by roughly 20× compared with the sequential version.',
        figures: [
          {
            src: articleAsset('sequential-runtime.png'),
            alt: 'Terminal output showing the sequential algorithm runtime',
            caption: 'Sequential runtime.',
          },
          {
            src: articleAsset('parallel-runtime.png'),
            alt: 'Terminal output showing the parallel algorithm runtime',
            caption: 'Parallel runtime.',
          },
        ],
      },
    ],
  },
];

export default function BlogSection() {
  const [activePost, setActivePost] = useState<Post | null>(null);

  const openPost = (post: Post) => {
    setActivePost(post);
    trackPageView(`/blog/${post.id}`, post.title);
  };

  useEffect(() => {
    if (!activePost) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setActivePost(null);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePost]);

  return (
    <section id="blog" className="border-y border-black/10 bg-white/45 px-8 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-black/40">Notes from the build</p>
            <h2 className="text-6xl font-black leading-[0.84] tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">BUILD.<br /><span className="text-black/20">BREAK.</span><br />LEARN.</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} className="max-w-xl lg:pb-2">
            <p className="text-xl font-medium leading-relaxed text-black/65 md:text-2xl">Honest notes about the projects I ship, the problems behind them, and what I would do differently next time.</p>
            <div className="mt-7 flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em]"><span className="h-px w-12 bg-black" />Read the process, not just the result</div>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-black/15 bg-black/15 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: index * 0.1 }} className="group flex min-h-[440px] flex-col bg-[#fbfbf8] p-6 transition-colors hover:bg-white md:p-8">
              <div className="flex items-start justify-between">
                <span className="text-sm font-black tracking-widest text-black/35">{post.number}</span>
                <span className={`h-4 w-4 rounded-full ${post.accent} transition-transform duration-300 group-hover:scale-[1.7]`} />
              </div>
              <div className="mt-16">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-black/45">{post.category}</p>
                <h3 className="mt-4 text-3xl font-black leading-[1.02] tracking-tight md:text-4xl">{post.title}</h3>
                <p className="mt-5 leading-relaxed text-black/55">{post.excerpt}</p>
              </div>
              <div className="mt-auto pt-10">
                <div className="mb-5 flex items-center gap-5 text-xs font-bold text-black/40"><span>{post.date}</span><span className="inline-flex items-center gap-1.5"><Clock3 size={13} />{post.readTime}</span></div>
                <button type="button" onClick={() => openPost(post)} className="flex w-full items-center justify-between border-t border-black/15 pt-5 text-left text-xs font-black uppercase tracking-[0.2em]" aria-label={`Read ${post.title}`}>
                  Read note <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activePost && (
          <motion.div className="fixed inset-0 z-[100] overflow-y-auto bg-[#f8f7f2]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="blog-post-title">
            <button type="button" onClick={() => setActivePost(null)} className="fixed right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-transform hover:rotate-90 md:right-8 md:top-8" aria-label="Close article"><X size={22} /></button>
            <motion.article initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="mx-auto max-w-5xl px-7 py-24 md:px-12 md:py-28">
              <div className="flex flex-wrap items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-black/45">
                <span>{activePost.category}</span><span className={`h-2.5 w-2.5 rounded-full ${activePost.accent}`} /><span>{activePost.date}</span><span>{activePost.readTime}</span>
              </div>
              <h2 id="blog-post-title" className="mt-8 max-w-4xl text-5xl font-black leading-[0.95] tracking-tighter sm:text-6xl md:text-8xl">{activePost.title}</h2>
              <p className="mt-8 max-w-3xl text-xl leading-relaxed text-black/55 md:text-2xl">{activePost.excerpt}</p>
              <div className="mt-10 flex flex-wrap items-center gap-2">
                {activePost.stack.map((item) => <span key={item} className="border border-black/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest">{item}</span>)}
                {activePost.repository && (
                  <a href={activePost.repository} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-black px-3 py-2 text-[10px] font-black uppercase tracking-widest text-white transition-colors hover:bg-black/75">
                    <Github size={14} aria-hidden="true" /> View code <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                )}
              </div>
              <div className="mt-20 border-t border-black/15">
                {activePost.sections.map((section, index) => (
                  <section key={section.heading} className="grid gap-5 border-b border-black/15 py-10 md:grid-cols-[160px_1fr] md:gap-12 md:py-14">
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-black/35">{String(index + 1).padStart(2, '0')} / {section.heading}</div>
                    <div className="min-w-0">
                      <div className="max-w-2xl space-y-5">
                        {(Array.isArray(section.body) ? section.body : [section.body]).map((paragraph) => (
                          <p key={paragraph} className="text-lg leading-8 text-black/70 md:text-xl md:leading-9">{paragraph}</p>
                        ))}
                      </div>
                      {section.bullets && (
                        <ul className="mt-8 grid max-w-2xl gap-px overflow-hidden border border-black/15 bg-black/15 sm:grid-cols-3">
                          {section.bullets.map((item) => (
                            <li key={item.label} className="bg-white/70 p-5">
                              <span className="block font-mono text-2xl font-black">{item.label}</span>
                              <span className="mt-2 block text-sm leading-6 text-black/60">{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.figures?.map((figure) => (
                        <figure key={figure.src} className="mt-10">
                          <div className="overflow-hidden border border-black/10 bg-white p-3 sm:p-5">
                            <img
                              src={figure.src}
                              alt={figure.alt}
                              loading="lazy"
                              className={`${figure.compact ? 'max-w-[180px]' : 'max-w-full'} mx-auto h-auto`}
                            />
                          </div>
                          <figcaption className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-black/40">{figure.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
              <button type="button" onClick={() => setActivePost(null)} className="mt-12 inline-flex items-center gap-3 bg-black px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-white"><span aria-hidden="true">←</span> Back to all notes</button>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
