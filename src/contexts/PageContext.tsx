// src/contexts/PageContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

export type PageId = 'home' | 'activity' | 'partners';

type NavigateOptions = {
  /** ホームページ内のセクション ID（例: "features", "faq"）を指定するとそこへスクロール */
  scrollTo?: string;
  /** false にすると自動スクロールを無効化 */
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

    // setPage 後の DOM 更新を待ってからスクロールしたいので、
    // requestAnimationFrame を 2 回挟む（1 回だと React の再描画前に走ることがある）
    const run = () => {
      if (opts.scroll === false) return;

      if (opts.scrollTo) {
        const el = document.getElementById(opts.scrollTo);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      // scrollTo 未指定 & ページが切り替わったときだけトップへ戻す
      // （同一ページ内クリックではスクロール位置を維持）
      if (!samePage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    if (samePage) {
      // 同一ページなら即スクロール
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
