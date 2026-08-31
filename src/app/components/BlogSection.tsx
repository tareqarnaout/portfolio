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
    heading?: string;
    body?: string | string[];
    code?: string;
    afterBullets?: string | string[];
    bullets?: Array<{ label: string; text: string }>;
    figures?: Array<{
      src: string;
      alt: string;
      caption: string;
      compact?: boolean;
    }>;
  }>;
};

const articleAsset = (article: string, filename: string) =>
  `${import.meta.env.BASE_URL}blog/${article}/${filename}`;

const posts: Post[] = [
  {
    id: 'maximal-clique-enumeration-parallel',
    number: '01',
    title: 'Maximal Clique Enumeration Parallel',
    excerpt: 'this sped my runtime of the algorithm in one of the cases by 20x.',
    category: 'Parallel computing',
    date: 'Aug 2026',
    readTime: '4 min read',
    accent: 'bg-[#ff6b9f]',
    stack: ['C++', 'OpenMP', 'Graph algorithms'],
    repository: 'https://github.com/tareqarnaout/maximal-clique-enumeration',
    sections: [
      {
        body: [
          'I wrote the Bron-Kerbosch algorithm in C++ in a sequential way basically what the standard algorithm does is go through all nodes in my graph recursively and count the number of all possible maximal cliques.',
          'lets say we have a graph with 4 nodes where 0 1 2 and 0 1 3 are maximal cliques.',
        ],
        figures: [
          {
            src: articleAsset('maximal-clique-enumeration-parallel', 'example-graph.png'),
            alt: 'A four-vertex graph with maximal cliques 0, 1, 2 and 0, 1, 3',
            caption: 'Figure 1',
          },
        ],
      },
      {
        heading: 'The algorithm has three arrays:',
        bullets: [
          { label: 'R', text: 'vertices already chosen for the current clique' },
          { label: 'P', text: 'vertices that can still be added to R' },
          { label: 'X', text: "vertices that were already considered, so we shouldn't generate the same clique again" },
        ],
        afterBullets: [
          'We start with a P array of all nodes and R empty array and empty X array ,if P and X are empty we consider R a maximal clique and every time we finish a node in our loop we remove it from R and put in X to prevent duplicates.',
          'for every node in our first iteration we put the node in a newR then we put in newP( P intersect  adj(v)) where v is a node in P, then we put it in newX (x intersect adj(v)) after that we call the BK function. After it finishes for the current v node we remove it from P and add to X so the next node that has v in its neighbors knows not to give a duplicate maximal clique.',
        ],
      },
      {
        heading: 'A visualization of what happens in our given graph:',
        figures: [
          {
            src: articleAsset('maximal-clique-enumeration-parallel', 'algorithm-walkthrough.png'),
            alt: 'Step-by-step Bron-Kerbosch traversal of the example graph',
            caption: 'Figure 2',
          },
        ],
      },
      {
        body: "the problem with the bk algorithm is that’s NP complete if we run this it'll take :",
        figures: [
          {
            src: articleAsset('maximal-clique-enumeration-parallel', 'worst-case-complexity.png'),
            alt: 'Three to the power of n over three, the worst-case number of maximal cliques',
            caption: '',
            compact: true,
          },
        ],
      },
      {
        body: [
          'To give all maximal cliques in the worst case.',
          'so I tried to lower its time by running it on parallel on a 32 core CPU using 32 threads.',
          'For the first iteration for every node in the graph i give each BK function call to a thread using task queue and if it happens in the first 2 depths of the recursion tree a node has a lot of neighbors I also add this BK function call to the task queue to try to split the load into multiple tasks, of-course there is a case scenario where deep in the recursion tree there exist a node with a lot of neighbors that will put a lot of load on one thread but I can’t keep putting tasks in the queue because of the overhead it creates.',
        ],
      },
      {
        heading: 'here is a visualization of what I did:',
        figures: [
          {
            src: articleAsset('maximal-clique-enumeration-parallel', 'task-management.png'),
            alt: 'Diagram showing OpenMP task creation and thread management across the recursion tree',
            caption: '',
          },
        ],
      },
      {
        heading: 'not parallel:',
        figures: [
          {
            src: articleAsset('maximal-clique-enumeration-parallel', 'sequential-runtime.png'),
            alt: 'Terminal output showing the sequential algorithm runtime',
            caption: '',
          },
        ],
      },
      {
        body: 'this sped my runtime of the algorithm in one of the cases by 20x.',
        figures: [
          {
            src: articleAsset('maximal-clique-enumeration-parallel', 'parallel-runtime.png'),
            alt: 'Terminal output showing the parallel algorithm runtime',
            caption: '',
          },
        ],
      },
    ],
  },
  {
    id: 'cluster',
    number: '02',
    title: 'Cluster',
    excerpt: 'In my journey to become the greatest system engineer, I decided to create a simple compression application using python this app utilizes all CPU cores  to compress any file given to it using gzip compression.',
    category: 'Distributed systems',
    date: 'Aug 2026',
    readTime: '3 min read',
    accent: 'bg-[#65c6ff]',
    stack: ['Python', 'TCP', 'gzip', 'ProcessPool Executor'],
    sections: [
      {
        body: [
          'In my journey to become the greatest system engineer, I decided to create a simple compression application using python this app utilizes all CPU cores  to compress any file given to it using gzip compression.',
          'In detail the app first splits the files into 128 MB chunks then distributes the compression work to the CPU cores , after it finishes it reassembles the chunks and gives the full .gz file.',
          'After that I thought to myself this easy work why not do a distributed cluster between two laptop nodes so I can learn how to handle the complexity of distributed work.',
          'So I started by installing Linux mint xfce on two old laptops i had connecting both directly through Ethernet, after that I wrote a simple python socket script to send messages between the two nodes just to test things out.',
          'OK easy work finished now i had to write the code to handle the distributed work, the architecture I ended up with is as the following:',
        ],
      },
      {
        code: `                DISTRIBUTED PARALLEL COMPRESSION CLUSTER

                          ┌───────────────┐
                          │   BIG FILE    │
                          │   10+ GB      │
                          └───────┬───────┘
                                  │
                                  ▼
                          ┌───────────────┐
                          │    Laptop 1   │
                          │  Controller   │
                          └───────┬───────┘
                                  │
                            Split into
                              chunks
                                  │
                ┌─────────────────┴─────────────────┐
                │                                   │
                ▼                                   ▼
         LOCAL CHUNKS                        REMOTE CHUNKS
                │                                   │
                │                                   │ TCP
                │                                   ▼
                │                           ┌───────────────┐
                │                           │   Laptop 2    │
                │                           │    Worker     │
                │                           └───────┬───────┘
                │                                   │
                │                           Receive chunks
                │                                   │
                │                                   ▼
                │                         ┌─────────────────┐
                │                         │ ProcessPool     │
                │                         │ Executor        │
                │                         └────────┬────────┘
                │                                  │
                │                    ┌─────────────┼─────────────┐
                │                    ▼             ▼             ▼
                │                  CPU 1         CPU 2         CPU 3 ...
                │                    │             │             │
                │                    └─────────────┴─────────────┐
                │                                                │
                │                                          Compress
                │                                                │
                │                                                ▼
                │                                       Compressed chunks
                │                                                │
                │                                                │ TCP
                │                                                ▼
                │                                         ┌──────────────┐
                │                                         │   Laptop 1   │
                │                                         └──────┬───────┘
                │                                                │
                ▼                                                │
         ┌───────────────┐                                       │
         │ ProcessPool   │                                       │
         │ Executor      │                                       │
         └───────┬───────┘                                       │
                 │                                               │
      ┌──────────┼──────────┐                                    │
      ▼          ▼          ▼                                    │
    CPU 1      CPU 2      CPU 3 ...                               │
      │          │          │                                    │
      └──────────┴──────────┘                                    │
                 │                                               │
             Compress                                            │
                 │                                               │
                 └──────────────────────┬────────────────────────┘
                                        │
                                        ▼
                              ┌─────────────────────┐
                              │ Compressed Chunks   │
                              │                     │
                              │ 0,1,2,3,4,...       │
                              └──────────┬──────────┘
                                         │
                                  Sort by chunk ID
                                         │
                                         ▼
                              ┌─────────────────────┐
                              │      Merge          │
                              └──────────┬──────────┘
                                         │
                                         ▼
                              ┌─────────────────────┐
                              │   FINAL FILE.GZ     │
                              └─────────────────────┘`,
      },
      {
        body: [
          'Node1(laptop1) is a the main server that handles the file split then using two threads it sends half of the work to node2 which also has 2 threads one that receives/sends the chunks and one that compresses these chunks. after node 2 finishes compressing the chunks it sends them back over network to node1 which has a thread waiting to receive the compressed chunks and save toi hard disk to save ram(expensive now a days) and if the first thread in node 1 has already finished compressing its half the program then assembles all chunks from node1 and node2 to create the final result .gz file.  \n(for the two nodes the compressing is parallel on the CPU cores to save time)',
          "For a compression algorithm splitting files in to chunks then distribute into two nodes creates overhead so it wasn't really about making something super fast it was about learning how to handle the complexity of organizing chunks of data between two nodes and sending them over network using TCP without mixing the data and joining them again in correct order.",
          'here’s a pic of my perfect cluster:',
        ],
        figures: [
          {
            src: articleAsset('cluster', 'image.png'),
            alt: 'The two-laptop compression cluster',
            caption: '',
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
                  <section key={index} className="grid gap-5 border-b border-black/15 py-10 md:grid-cols-[160px_1fr] md:gap-12 md:py-14">
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-black/35">{String(index + 1).padStart(2, '0')}{section.heading && <>{' / '}{section.heading}</>}</div>
                    <div className="min-w-0">
                      {section.body && <div className="max-w-2xl space-y-5">
                        {(Array.isArray(section.body) ? section.body : [section.body]).map((paragraph) => (
                          <p key={paragraph} className="text-lg leading-8 text-black/70 md:text-xl md:leading-9">{paragraph}</p>
                        ))}
                      </div>}
                      {section.code && <pre className="mt-8 overflow-x-auto border border-black/15 bg-black p-5 text-xs leading-5 text-white sm:text-sm"><code>{section.code}</code></pre>}
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
                      {section.afterBullets && (
                        <div className="mt-8 max-w-2xl space-y-5">
                          {(Array.isArray(section.afterBullets) ? section.afterBullets : [section.afterBullets]).map((paragraph) => (
                            <p key={paragraph} className="text-lg leading-8 text-black/70 md:text-xl md:leading-9">{paragraph}</p>
                          ))}
                        </div>
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
                          {figure.caption && <figcaption className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-black/40">{figure.caption}</figcaption>}
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
