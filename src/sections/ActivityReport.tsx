// src/sections/ActivityReport.tsx
import { useEffect, useRef } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { usePage } from '../contexts/PageContext';
import reportsData from '../data/reports.json';

const { stats: STATS, reports: REPORTS } = reportsData;

// ─── Instagram 埋め込みスクリプトを1回だけロードするフック ───
function useInstagramEmbed(active: boolean) {
  const loaded = useRef(false);
  useEffect(() => {
    if (!active || typeof window === 'undefined') return;
    const w = window as unknown as { instgrm?: { Embeds: { process(): void } } };
    if (w.instgrm) { w.instgrm.Embeds.process(); return; }
    if (loaded.current) return;
    loaded.current = true;
    const s = document.createElement('script');
    s.src = 'https://www.instagram.com/embed.js';
    s.async = true;
    document.body.appendChild(s);
  }, [active]);
}

// ─── 画像グリッド ───
function ImageGrid({ images, accentColor }: { images: string[]; accentColor: string }) {
  if (!images.length) return null;
  const cols = images.length === 1 ? 1 : images.length === 2 ? 2 : 3;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 8, borderRadius: 12, overflow: 'hidden', border: `1px solid ${accentColor}30` }}>
      {images.map((src, i) => (
        <div key={i} style={{ aspectRatio: '4/3', overflow: 'hidden', background: '#0a1320' }}>
          <img src={src} alt={`写真 ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      ))}
    </div>
  );
}

// ─── Instagram 埋め込み ───
function InstagramEmbed({ url }: { url: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <blockquote
        className='instagram-media'
        data-instgrm-permalink={url}
        data-instgrm-version='14'
        style={{ margin: 0, maxWidth: 540, width: '100%', border: 'none' }}
      />
    </div>
  );
}

export default function ActivityReport() {
  const { tokens: T } = useTheme();
  const { navigate } = usePage();

  const hasInstagram = REPORTS.some((r) => r.instagramUrl);
  useInstagramEmbed(hasInstagram);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .ar-section { padding: 48px 20px !important; }
          .ar-h1 { font-size: 32px !important; }
          .ar-card { grid-template-columns: 1fr !important; padding: 24px !important; }
          .ar-meta { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
        }
      `}</style>
      <section className='ar-section' style={{ padding: '72px 48px', position: 'relative' }}>

        {/* 戻るボタン */}
        <button type='button' onClick={() => navigate('home')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 999, background: T.surface, color: T.textMute, border: `1px solid ${T.border}`, fontSize: 13, fontWeight: 700, cursor: 'pointer', marginBottom: 32 }}>
          ← トップへ戻る
        </button>

        {/* ヘッダ */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 12, color: T.primary, letterSpacing: '0.3em', fontWeight: 800, marginBottom: 14 }}>★ ACTIVITY REPORT ★</div>
          <h1 className='ar-h1' style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.2, margin: '0 0 16px', letterSpacing: '-0.01em' }}>活動報告</h1>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: T.textMute, maxWidth: 640, margin: 0 }}>
            これまでに開催したロボット創造教室の様子と、子どもたちの成長の記録。「動いた！」「できた！」が生まれた瞬間を共有します。
          </p>
        </div>

        {/* 統計サマリー */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 56 }}>
          {STATS.map((s) => (
            <div key={s.key} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{s.emoji}</div>
              <div style={{ fontSize: 11, color: T.primary, letterSpacing: '0.2em', fontWeight: 800, marginBottom: 6 }}>{s.key}</div>
              <div style={{ fontSize: 22, fontWeight: 900 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* レポート一覧 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {REPORTS.map((r, i) => {
            const accentColor = r.color === 'primary' ? T.primary : r.color === 'accent' ? T.accent : T.yellow;
            const hasMedia = r.images.length > 0 || !!r.instagramUrl;
            return (
              <article key={r.date} className='ar-card' style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 32, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: 32, position: 'relative', overflow: 'hidden' }}>

                {/* 装飾ライン */}
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: accentColor }} />

                {/* 左：日付 */}
                <div>
                  <div style={{ fontSize: 11, color: accentColor, letterSpacing: '0.2em', fontWeight: 800, marginBottom: 6 }}>
                    REPORT {String(REPORTS.length - i).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 10 }}>{r.date}</div>
                  <div style={{ display: 'inline-flex', gap: 6, alignItems: 'center', padding: '4px 10px', borderRadius: 999, background: `${accentColor}15`, color: accentColor, fontSize: 11, fontWeight: 800 }}>
                    👶 {r.participants}名参加
                  </div>
                </div>

                {/* 右：本文 + メディア */}
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 8px' }}>{r.title}</h2>
                  <div className='ar-meta' style={{ display: 'flex', gap: 14, fontSize: 12, color: T.textMute, marginBottom: 16, alignItems: 'center' }}>
                    <span>📍 {r.place}</span>
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.9, color: T.textMute, margin: '0 0 16px' }}>{r.body}</p>

                  {/* タグ */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {r.tags.map((t) => (
                      <span key={t} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 999, background: T.bgDeep, color: T.textMute2, border: `1px solid ${T.border}` }}>{t}</span>
                    ))}
                  </div>

                  {/* ── メディアエリア ── */}
                  {hasMedia && (
                    <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div style={{ height: 1, background: `${accentColor}25` }} />

                      {r.images.length > 0 && (
                        <ImageGrid images={r.images} accentColor={accentColor} />
                      )}

                      {r.instagramUrl && (
                        <>
                          {r.images.length > 0 && (
                            <div style={{ fontSize: 11, color: T.textMute, letterSpacing: '0.15em', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ color: accentColor }}>▶</span> INSTAGRAM
                            </div>
                          )}
                          <InstagramEmbed url={r.instagramUrl} />
                        </>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* 下部CTA */}
        <div style={{ marginTop: 64, padding: 32, background: T.bgDeep, borderRadius: 20, textAlign: 'center', border: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>🚄 次回開催も準備中です</div>
          <p style={{ fontSize: 14, color: T.textMute, margin: '0 0 20px' }}>最新情報はトップページからご確認ください</p>
          <button type='button' onClick={() => navigate('home')} style={{ background: T.accent, color: 'white', border: 'none', padding: '14px 28px', borderRadius: 999, fontWeight: 800, fontSize: 14, cursor: 'pointer', boxShadow: `0 8px 20px -6px ${T.accent}99` }}>
            トップへ戻る →
          </button>
        </div>
      </section>
    </>
  );
}
