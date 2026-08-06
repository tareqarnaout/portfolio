import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Clock3, X } from 'lucide-react';

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
  sections: Array<{ heading: string; body: string }>;
};

const posts: Post[] = [
  {
    id: 'portfolio-with-purpose', number: '01', title: 'Building a portfolio with purpose',
    excerpt: 'How I turned a simple portfolio into a fast, expressive experience—and the decisions I made along the way.',
    category: 'Case study', date: 'Aug 2026', readTime: '5 min read', accent: 'bg-[#ff6b9f]',
    stack: ['React', 'TypeScript', 'Motion'],
    sections: [
      { heading: 'The idea', body: 'I wanted the portfolio to feel like me before a visitor read a single line. The goal was a confident first impression, a clear path through my work, and enough movement to feel alive without getting in the way.' },
      { heading: 'How I built it', body: 'I split the interface into focused React components, used TypeScript to keep the content predictable, and added motion only where it supports hierarchy. Project data stays separate from presentation so new work can be added without redesigning the page.' },
      { heading: 'What I learned', body: 'The strongest visual idea is usually the one you repeat with restraint. Performance, accessibility, and responsive behavior are not finishing touches—they shape the design from the start.' },
    ],
  },
  {
    id: 'api-to-interface', number: '02', title: 'From API response to useful interface',
    excerpt: 'A practical look at fetching live project data, shaping it for the UI, and designing for the failure states too.',
    category: 'Engineering notes', date: 'Jul 2026', readTime: '4 min read', accent: 'bg-[#76d7ff]',
    stack: ['GitHub API', 'React', 'UX'],
    sections: [
      { heading: 'The problem', body: 'Repository data is useful, but it is not presentation-ready. Names need formatting, languages need grouping, and missing descriptions need a thoughtful fallback.' },
      { heading: 'The implementation', body: 'The projects component fetches repositories once, filters experiments that are not portfolio-ready, and maps every result into a small UI model. Loading and empty states keep the page stable when the network does not cooperate.' },
      { heading: 'The takeaway', body: 'Good frontend work is often translation work: turning inconsistent external data into something clear and dependable for a person. Designing the unhappy path makes the happy path feel more polished.' },
    ],
  },
  {
    id: 'motion-that-explains', number: '03', title: 'Motion should explain, not decorate',
    excerpt: 'What I learned while using animation to guide attention, reveal structure, and add personality without adding friction.',
    category: 'What I learned', date: 'Jun 2026', readTime: '3 min read', accent: 'bg-[#c8ff67]',
    stack: ['GSAP', 'Motion', 'Accessibility'],
    sections: [
      { heading: 'A useful constraint', body: 'Every animation should answer a question: what changed, where did it come from, or what deserves attention next? If it cannot answer one, it probably does not belong.' },
      { heading: 'The approach', body: 'Large headings enter once as the reader reaches them, menu items reveal in sequence, and cards respond directly to interaction. Timings stay short and easing does most of the expressive work.' },
      { heading: 'What changed for me', body: 'I stopped treating motion as a layer added at the end. Planning it with the layout leads to calmer transitions, cleaner code, and an interface that communicates more clearly.' },
    ],
  },
];

export default function BlogSection() {
  const [activePost, setActivePost] = useState<Post | null>(null);

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
                <button type="button" onClick={() => setActivePost(post)} className="flex w-full items-center justify-between border-t border-black/15 pt-5 text-left text-xs font-black uppercase tracking-[0.2em]" aria-label={`Read ${post.title}`}>
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
              <div className="mt-10 flex flex-wrap gap-2">{activePost.stack.map((item) => <span key={item} className="border border-black/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest">{item}</span>)}</div>
              <div className="mt-20 border-t border-black/15">
                {activePost.sections.map((section, index) => (
                  <section key={section.heading} className="grid gap-5 border-b border-black/15 py-10 md:grid-cols-[160px_1fr] md:gap-12 md:py-14">
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-black/35">{String(index + 1).padStart(2, '0')} / {section.heading}</div>
                    <p className="max-w-2xl text-lg leading-8 text-black/70 md:text-xl md:leading-9">{section.body}</p>
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
