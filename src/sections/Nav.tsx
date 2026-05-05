// src/sections/Nav.tsx
import { useState } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { usePage, PageId } from '../contexts/PageContext';

type NavLink =
  | { kind: 'anchor'; label: string; sectionId: string }
  | { kind: 'page';   label: string; page: PageId };

const LINKS: NavLink[] = [
  { kind: 'anchor', label: '特徴',         sectionId: 'features' },
  { kind: 'anchor', label: '授業風景',     sectionId: 'flow' },
  { kind: 'anchor', label: '講師',         sectionId: 'teacher' },
  { kind: 'anchor', label: 'FAQ',          sectionId: 'faq' },
  { kind: 'anchor', label: 'アクセス',     sectionId: 'access' },
  { kind: 'page',   label: '活動報告',     page: 'activity' },
  { kind: 'page',   label: '協力団体',     page: 'partners' },
  { kind: 'page',   label: 'お問い合わせ', page: 'contact' },
];

export default function Nav() {
  const { tokens: T } = useTheme();
  const { page, navigate } = usePage();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (l: NavLink) => {
    if (l.kind === 'page') { navigate(l.page); }
    else { navigate('home', { scrollTo: l.sectionId }); }
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-mobile-menu { display: flex !important; }
        }
      `}</style>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: `1px solid ${T.border}`, position: 'relative', zIndex: 100 }}>

        {/* ロゴ */}
        <div onClick={() => navigate('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${T.primaryStrong}, ${T.primaryGradTo})`, display: 'grid', placeItems: 'center', fontSize: 20 }}>🚄</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800 }}>ロボット創造教室</div>
            <div style={{ fontSize: 9, color: T.primary, letterSpacing: '0.2em' }}>ROBOT CREATIVE LAB</div>
          </div>
        </div>

        {/* PC：ナビリンク */}
        <div className='nav-links' style={{ display: 'flex', gap: 24, fontSize: 13, color: T.textMute, alignItems: 'center' }}>
          {LINKS.map((l) => {
            const isActivePage = l.kind === 'page' && page === l.page;
            return (
              <span key={l.label} onClick={() => handleClick(l)} style={{ cursor: 'pointer', fontWeight: isActivePage ? 800 : 500, color: isActivePage ? T.primary : T.textMute, padding: l.kind === 'page' ? '4px 10px' : 0, borderRadius: l.kind === 'page' ? 999 : 0, border: l.kind === 'page' ? `1px solid ${isActivePage ? T.primary : T.border}` : 'none', background: isActivePage ? `${T.primary}15` : 'transparent', transition: 'all 0.2s' }}>
                {l.label}
              </span>
            );
          })}
        </div>

        {/* PC：CTAボタン */}
        <button type='button' className='nav-cta-desktop' onClick={() => navigate('home', { scrollTo: 'cta' })} style={{ background: T.accent, color: 'white', border: 'none', padding: '10px 20px', borderRadius: 999, fontWeight: 800, fontSize: 13, boxShadow: `0 0 24px ${T.accent}66`, cursor: 'pointer' }}>
          応募はこちら →
        </button>

        {/* SP：ハンバーガー */}
        <button type='button' className='nav-hamburger' onClick={() => setMenuOpen((v) => !v)} style={{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ display: 'block', width: 24, height: 2, background: T.text, borderRadius: 2, transition: 'all 0.2s', transform: menuOpen ? i === 0 ? 'translateY(7px) rotate(45deg)' : i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'scaleX(0)' : 'none' }} />
          ))}
        </button>
      </nav>

      {/* SP：ドロワーメニュー */}
      {menuOpen && (
        <div className='nav-mobile-menu' style={{ display: 'none', flexDirection: 'column', gap: 0, background: T.surface, borderBottom: `1px solid ${T.border}`, zIndex: 99 }}>
          {LINKS.map((l) => {
            const isActivePage = l.kind === 'page' && page === l.page;
            return (
              <div key={l.label} onClick={() => handleClick(l)} style={{ padding: '16px 24px', fontSize: 15, fontWeight: isActivePage ? 800 : 600, color: isActivePage ? T.primary : T.text, borderBottom: `1px solid ${T.border}`, cursor: 'pointer', background: isActivePage ? `${T.primary}10` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>{l.label}</span>
                {l.kind === 'page' && <span style={{ fontSize: 12, color: T.primary }}>→</span>}
              </div>
            );
          })}
          <div style={{ padding: 16 }}>
            <button type='button' onClick={() => { navigate('home', { scrollTo: 'cta' }); setMenuOpen(false); }} style={{ width: '100%', background: T.accent, color: 'white', border: 'none', padding: '14px', borderRadius: 999, fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
              応募はこちら →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
