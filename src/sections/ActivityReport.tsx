// src/sections/ActivityReport.tsx
// 活動報告ページ
// Supabase の reports テーブルからデータを取得して表示する。

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../theme/ThemeContext';
import { usePage } from '../contexts/PageContext';
import { supabase } from '../lib/supabase'; // Supabase クライアント

// 型定義
// Supabase の reports テーブルの1行分の型。
// TypeScript はこの型を使って「間違ったプロパティ名」などをビルド時に検出してくれる。
type Report = {
  id: number;
  date: string; // 例: "2026.03.15"
  title: string;
  place: string;
  body: string;
  color: 'primary' | 'accent' | 'yellow'; // カードのアクセントカラー
  images: string[]; // 画像URLの配列
  instagram_url: string | null; // Instagram投稿URL（なければ null）
  sort_order: number; // 表示順（小さい数字が上に来る）
};

// カスタムフック: Instagram 埋め込みスクリプトの読み込み
function useInstagramEmbed(active: boolean) {
  const loaded = useRef(false);

  useEffect(() => {
    if (!active || typeof window === 'undefined') return;

    const w = window as unknown as {
      instgrm?: { Embeds: { process(): void } };
    };

    if (w.instgrm) {
      w.instgrm.Embeds.process();
      return;
    }

    if (loaded.current) return;
    loaded.current = true;

    const s = document.createElement('script');
    s.src = 'https://www.instagram.com/embed.js';
    s.async = true;
    document.body.appendChild(s);
  }, [active]);
}

// 子コンポーネント: 画像グリッド
function ImageGrid({
  images,
  accentColor,
}: {
  images: string[];
  accentColor: string;
}) {
  if (!images.length) return null;

  const cols = images.length === 1 ? 1 : images.length === 2 ? 2 : 3;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 8,
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${accentColor}30`,
        maxWidth: 540,
        margin: '0 auto',
      }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          style={{
            aspectRatio: '1/1',
            overflow: 'hidden',
            background: '#0a1320',
          }}
        >
          <img
            src={src}
            alt={`写真 ${i + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      ))}
    </div>
  );
}

// 子コンポーネント: Instagram 埋め込み
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

// メインコンポーネント
export default function ActivityReport() {
  const { tokens: T } = useTheme();
  const { navigate } = usePage();

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('reports')
      .select('*')
      .order('sort_order', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setReports(data ?? []);
        setLoading(false);
      });
  }, []);

  const hasInstagram = reports.some((r) => r.instagram_url);
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

      <section
        className='ar-section'
        style={{ padding: '72px 48px', position: 'relative' }}
      >
        <button
          type='button'
          onClick={() => navigate('home')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            borderRadius: 999,
            background: T.surface,
            color: T.textMute,
            border: `1px solid ${T.border}`,
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            marginBottom: 32,
          }}
        >
          ← トップへ戻る
        </button>

        <div style={{ marginBottom: 48 }}>
          <div
            style={{
              fontSize: 12,
              color: T.primary,
              letterSpacing: '0.3em',
              fontWeight: 800,
              marginBottom: 14,
            }}
          >
            ★ ACTIVITY REPORT ★
          </div>
          <h1
            className='ar-h1'
            style={{
              fontSize: 48,
              fontWeight: 900,
              lineHeight: 1.2,
              margin: '0 0 16px',
              letterSpacing: '-0.01em',
            }}
          >
            活動報告
          </h1>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.85,
              color: T.textMute,
              maxWidth: 640,
              margin: 0,
            }}
          >
            これまでに開催したロボット創造教室の様子と、子どもたちの成長の記録。
          </p>
        </div>

        {loading && (
          <div
            style={{
              textAlign: 'center',
              padding: 48,
              color: T.textMute,
              fontSize: 14,
            }}
          >
            読み込み中...
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {reports.map((r, i) => {
            const accentColor =
              r.color === 'primary'
                ? T.primary
                : r.color === 'accent'
                  ? T.accent
                  : T.yellow;

            const hasMedia = r.images.length > 0 || !!r.instagram_url;

            return (
              <article
                key={r.id}
                className='ar-card'
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr',
                  gap: 32,
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 20,
                  padding: 32,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    background: accentColor,
                  }}
                />

                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: accentColor,
                      letterSpacing: '0.2em',
                      fontWeight: 800,
                      marginBottom: 6,
                    }}
                  >
                    REPORT {String(reports.length - i).padStart(2, '0')}
                  </div>
                  <div
                    style={{ fontSize: 22, fontWeight: 900, marginBottom: 10 }}
                  >
                    {r.date}
                  </div>
                </div>

                <div>
                  <h2
                    style={{ fontSize: 22, fontWeight: 900, margin: '0 0 8px' }}
                  >
                    {r.title}
                  </h2>
                  <div
                    className='ar-meta'
                    style={{
                      display: 'flex',
                      gap: 14,
                      fontSize: 12,
                      color: T.textMute,
                      marginBottom: 16,
                      alignItems: 'center',
                    }}
                  >
                    <span>📍 {r.place}</span>
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.9,
                      color: T.textMute,
                      margin: '0 0 16px',
                    }}
                  >
                    {r.body}
                  </p>

                  {hasMedia && (
                    <div
                      style={{
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 16,
                      }}
                    >
                      <div
                        style={{ height: 1, background: `${accentColor}25` }}
                      />

                      {r.images.length > 0 && (
                        <ImageGrid
                          images={r.images}
                          accentColor={accentColor}
                        />
                      )}

                      {r.instagram_url && (
                        <>
                          {r.images.length > 0 && (
                            <div
                              style={{
                                fontSize: 11,
                                color: T.textMute,
                                letterSpacing: '0.15em',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                              }}
                            >
                              <span style={{ color: accentColor }}>▶</span>{' '}
                              INSTAGRAM
                            </div>
                          )}
                          <InstagramEmbed url={r.instagram_url} />
                        </>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 64,
            padding: 32,
            background: T.bgDeep,
            borderRadius: 20,
            textAlign: 'center',
            border: `1px solid ${T.border}`,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>
            🚄 次回開催も準備中です
          </div>
          <p style={{ fontSize: 14, color: T.textMute, margin: '0 0 20px' }}>
            最新情報はトップページからご確認ください
          </p>
          <button
            type='button'
            onClick={() => navigate('home')}
            style={{
              background: T.accent,
              color: 'white',
              border: 'none',
              padding: '14px 28px',
              borderRadius: 999,
              fontWeight: 800,
              fontSize: 14,
              cursor: 'pointer',
              boxShadow: `0 8px 20px -6px ${T.accent}99`,
            }}
          >
            トップへ戻る →
          </button>
        </div>
      </section>
    </>
  );
}
