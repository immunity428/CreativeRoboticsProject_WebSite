// src/App.tsx
import { useEffect } from "react";
import { ThemeProvider, useTheme } from "./theme/ThemeContext";
import Nav from "./sections/Nav";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import Flow from "./sections/Flow";
import Teacher from "./sections/Teacher";
import Faq from "./sections/Faq";
import Access from "./sections/Access";
import Cta from "./sections/Cta";
import Footer from "./sections/Footer";

function ThemedBody() {
  const { tokens: T, mode } = useTheme();

  useEffect(() => {
    document.body.classList.toggle("light-mode", mode === "light");
  }, [mode]);

  return (
    <div
      style={{
        background: T.bg,
        color: T.text,
        fontFamily:
          '"Hiragino Kaku Gothic ProN", "Yu Gothic", "Noto Sans JP", system-ui, sans-serif',
      }}
    >
      <Nav />
      <Hero />
      <Features />
      <Flow />
      <Teacher />
      <Faq />
      <Access />
      <Cta />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider initialMode="dark">
      <ThemedBody />
    </ThemeProvider>
  );
}
