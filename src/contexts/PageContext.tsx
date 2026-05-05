// src/contexts/PageContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

export type PageId = 'home' | 'activity' | 'partners' | 'contact';

type NavigateOptions = {
  scrollTo?: string;
  scroll?: boolean;
};

type PageContextType = {
  page: PageId;
  navigate: (p: PageId, opts?: NavigateOptions) => void;
};

const PageContext = createContext<PageContextType | undefined>(undefined);

export function PageProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<PageId>('home');

  const navigate = (p: PageId, opts: NavigateOptions = {}) => {
    const samePage = p === page;
    setPage(p);

    const run = () => {
      if (opts.scroll === false) return;
      if (opts.scrollTo) {
        const el = document.getElementById(opts.scrollTo);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      if (!samePage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    if (samePage) {
      requestAnimationFrame(run);
    } else {
      requestAnimationFrame(() => requestAnimationFrame(run));
    }
  };

  return (
    <PageContext.Provider value={{ page, navigate }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  const ctx = useContext(PageContext);
  if (!ctx) throw new Error('usePage must be used within PageProvider');
  return ctx;
}
