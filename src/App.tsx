// src/App.tsx
import { ThemeProvider } from './theme/ThemeContext';
import { PageProvider, usePage } from './contexts/PageContext';

import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Features from './sections/Features';
import Flow from './sections/Flow';
import Teacher from './sections/Teacher';
import Faq from './sections/Faq';
import Access from './sections/Access';
import Cta from './sections/Cta';
import Footer from './sections/Footer';

import ActivityReport from './sections/ActivityReport';
import Partners from './sections/Partners';

/**
 * ホームページ
 * 各セクションを id 付きの div でラップして、Nav からのアンカースクロール先にする。
 * scroll-margin-top は固定ヘッダの高さぶん上にズラすための余白（80px = ナビ高さ ＋ 余白）。
 */
function HomePage() {
  const sectionStyle = { scrollMarginTop: 80 } as const;
  return (
    <>
      <div id='hero' style={sectionStyle}>
        <Hero />
      </div>
      <div id='features' style={sectionStyle}>
        <Features />
      </div>
      <div id='flow' style={sectionStyle}>
        <Flow />
      </div>
      <div id='teacher' style={sectionStyle}>
        <Teacher />
      </div>
      <div id='faq' style={sectionStyle}>
        <Faq />
      </div>
      <div id='access' style={sectionStyle}>
        <Access />
      </div>
      <div id='cta' style={sectionStyle}>
        <Cta />
      </div>
    </>
  );
}

function PageSwitcher() {
  const { page } = usePage();
  switch (page) {
    case 'activity':
      return <ActivityReport />;
    case 'partners':
      return <Partners />;
    case 'home':
    default:
      return <HomePage />;
  }
}

export default function App() {
  return (
    <ThemeProvider>
      <PageProvider>
        <Nav />
        <PageSwitcher />
        <Footer />
      </PageProvider>
    </ThemeProvider>
  );
}
