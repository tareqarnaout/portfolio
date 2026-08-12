type GoatCounterWindow = Window & {
  goatcounter?: {
    count: (data: { path: string; title: string }) => void;
  };
};

const siteCode = import.meta.env.VITE_GOATCOUNTER_CODE?.trim() || 'tareqarnaout';
const trackedPaths = new Set<string>();
let loader: Promise<void> | null = null;

export const goatCounterEnabled = Boolean(siteCode);

function loadGoatCounter() {
  if (!siteCode) return Promise.resolve();
  if (loader) return loader;

  loader = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-goatcounter]');

    if (existing) {
      if ((window as GoatCounterWindow).goatcounter?.count) resolve();
      else existing.addEventListener('load', () => resolve(), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://gc.zgo.at/count.js';
    script.dataset.goatcounter = `https://${siteCode}.goatcounter.com/count`;
    script.dataset.goatcounterSettings = JSON.stringify({ no_onload: true });
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(new Error('Could not load GoatCounter')), { once: true });
    document.head.appendChild(script);
  });

  return loader;
}

export async function trackPageView(path: string, title: string) {
  if (!siteCode || trackedPaths.has(path)) return;

  try {
    await loadGoatCounter();
    const goatcounter = (window as GoatCounterWindow).goatcounter;
    if (!goatcounter?.count) return;

    goatcounter.count({ path, title });
    trackedPaths.add(path);
  } catch {
    // Analytics should never affect the portfolio experience.
  }
}

export async function getVisitCount(path: string) {
  if (!siteCode) return null;

  const response = await fetch(
    `https://${siteCode}.goatcounter.com/counter/${encodeURIComponent(path)}.json`,
  );

  if (response.status === 404) return '0';
  if (!response.ok) throw new Error('Could not load visit count');

  const data = (await response.json()) as { count: string };
  return data.count;
}
