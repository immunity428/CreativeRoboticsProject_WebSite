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

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Flow />
      <Teacher />
      <Faq />
      <Access />
      <Cta />
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
