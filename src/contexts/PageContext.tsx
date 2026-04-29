// src/contexts/PageContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

export type PageId = "home" | "activity" | "partners";

type PageContextType = {
  page: PageId;
  navigate: (p: PageId) => void;
};

const PageContext = createContext<PageContextType | undefined>(undefined);

export function PageProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<PageId>("home");

  const navigate = (p: PageId) => {
    setPage(p);
    // ページ遷移時に最上部にスクロール
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageContext.Provider value={{ page, navigate }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  const ctx = useContext(PageContext);
  if (!ctx) throw new Error("usePage must be used within PageProvider");
  return ctx;
}
