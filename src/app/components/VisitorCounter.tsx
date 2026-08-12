import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { getVisitCount, goatCounterEnabled } from '../lib/goatCounter';

type Counts = {
  home: string;
  blog: string;
  total: string;
};

export default function VisitorCounter() {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    if (!goatCounterEnabled) return;

    Promise.all([
      getVisitCount('/home'),
      getVisitCount('/blog/maximal-clique-enumeration-parallel'),
      getVisitCount('TOTAL'),
    ])
      .then(([home, blog, total]) => {
        if (home !== null && blog !== null && total !== null) {
          setCounts({ home, blog, total });
        }
      })
      .catch(() => setCounts(null));
  }, []);

  if (!goatCounterEnabled) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-[0.16em] text-black/40 md:justify-start">
      <span className="inline-flex items-center gap-2 text-black/55">
        <Eye size={14} aria-hidden="true" /> Visits
      </span>
      <span>Home {counts?.home ?? '—'}</span>
      <span>Blog {counts?.blog ?? '—'}</span>
      <span className="text-black/60">Total {counts?.total ?? '—'}</span>
    </div>
  );
}
