// src/sections/Access.tsx
import { useState } from 'react';
import { useTheme } from '../theme/ThemeContext';

const VENUES = [
  {
    id: 'suwarika',
    name: '公立諏訪東京理科大学',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3227.5114457014324!2d138.1807256745224!3d36.007802211967594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601c50e71f7adf49%3A0x2a9c9bdd30254f00!2z5YWs56uL6KuP6Kiq5p2x5Lqs55CG56eR5aSn5a2m!5e0!3m2!1sja!2sjp!4v1777455280137!5m2!1sja!2sjp',
    rows: [['住所', '長野県茅野市豊平5000-1']],
  },
  {
    id: 'cominka',
    name: 'コミン家',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3228.51018013501!2d138.205615974521!3d35.9833990133182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601c5b7ba46cb33f%3A0x115f236ebfc561f7!2z44Kz44Of44Oz5a62IOOCsuOCueODiOODj-OCpuOCuSDjgqvjg5XjgqcgQ29taW5rYQ!5e0!3m2!1sja!2sjp!4v1777455301396!5m2!1sja!2sjp',
    rows: [['住所', '長野県茅野市玉川7401']],
  },
  {
    id: 'tenkou',
    name: 'かふぇ天香',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3228.1610588169183!2d138.1498933745214!3d35.99193111284607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601c5731d3a155d5%3A0xb53ce78ae62650da!2z44GL44G144GH5aSp6aaZ!5e0!3m2!1sja!2sjp!4v1777455240661!5m2!1sja!2sjp',
    rows: [['住所', '長野県茅野市ちの3053']],
  },
] as const;

type VenueId = (typeof VENUES)[number]['id'];

export default function Access() {
  const { tokens: T } = useTheme();
  const [current, setCurrent] = useState<VenueId>('suwarika');

  const venue = VENUES.find((v) => v.id === current)!;

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .access-section { padding: 0 20px 60px !important; }
          .access-grid { grid-template-columns: 1fr !important; }
          .access-map { aspect-ratio: 4/3 !important; }
          .access-h2 { font-size: 28px !important; }
        }
      `}</style>
      <section className='access-section' style={{ padding: '0 48px 80px' }}>
        {/* セクションヘッダ */}
        <div
          style={{
            fontSize: 12,
            color: T.primary,
            letterSpacing: '0.3em',
            fontWeight: 800,
            marginBottom: 14,
          }}
        >
          ★ ACCESS ★
        </div>
        <h2
          className='access-h2'
          style={{ fontSize: 36, fontWeight: 900, margin: '0 0 24px' }}
        >
          会場案内
        </h2>

        {/* 会場切り替えタブ */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: 24,
            flexWrap: 'wrap',
          }}
        >
          {VENUES.map((v) => {
            const isActive = v.id === current;
            return (
              <button
                key={v.id}
                type='button'
                onClick={() => setCurrent(v.id)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 999,
                  border: isActive
                    ? `2px solid ${T.primary}`
                    : `1px solid ${T.border}`,
                  background: isActive ? T.primary : T.surface,
                  color: isActive ? '#fff' : T.textMute,
                  fontWeight: isActive ? 800 : 500,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {v.name}
              </button>
            );
          })}
        </div>

        {/* マップ + 情報グリッド */}
        <div
          className='access-grid'
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
            alignItems: 'stretch',
          }}
        >
          {/* Google マップ */}
          <div
            className='access-map'
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              border: `1px solid ${T.border}`,
              aspectRatio: '4/3',
            }}
          >
            <iframe
              key={venue.id}
              src={venue.mapSrc}
              width='100%'
              height='100%'
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              title={`${venue.name} の地図`}
            />
          </div>

          {/* 教室情報 */}
          <div
            style={{
              background: T.surface,
              padding: 28,
              borderRadius: 16,
              border: `1px solid ${T.border}`,
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: T.primary,
                letterSpacing: '0.3em',
                fontWeight: 800,
                marginBottom: 14,
              }}
            >
              ★ ACCESS ★
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 900, margin: '0 0 20px' }}>
              {venue.name}
            </h3>
            <div style={{ fontSize: 14, lineHeight: 2.1, color: T.textMute2 }}>
              {venue.rows.map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: 'flex',
                    gap: 12,
                    paddingBlock: 4,
                    borderBottom: `1px solid ${T.border}`,
                    flexWrap: 'wrap',
                  }}
                >
                  <strong
                    style={{
                      color: T.text,
                      display: 'inline-block',
                      minWidth: 70,
                    }}
                  >
                    {k}
                  </strong>
                  <span style={{ flex: 1 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
