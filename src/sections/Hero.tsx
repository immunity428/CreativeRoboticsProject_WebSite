// src/sections/Hero.tsx
//
// ヒーローセクション
// Supabase の events テーブルから次回開催情報を取得して表示する。
// Cta.tsx と同じテーブルを参照するので、Supabase を更新すれば両方に反映される。

import { useEffect, useState } from 'react';
import { useTheme } from '../theme/ThemeContext';
import ShinkansenSVG from '../components/ShinkansenSVG';
import headerImg from '../assets/header.jpeg';
import { supabase } from '../lib/supabase';

// events テーブルの型（Cta.tsx と共通）
type EventData = {
  id: number;
  date: string | null;
  date_label: string;
  day_of_week: string | null;
  place_label: string;
  status: string;
  google_form_id: string | null;
};

export default function Hero() {
  const { tokens: T } = useTheme();

  // Supabase から取得したイベントデータを管理する state
  const [event, setEvent] = useState<EventData | null>(null);

  // マウント時に events テーブルの最新1件を取得する
  // Cta.tsx と同じクエリなので、データの一貫性が保たれる
  useEffect(() => {
    supabase
      .from('events')
      .select('*')
      .order('id', { ascending: false }) // 最新のものを取得
      .limit(1)
      .single()
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setEvent(data);
      });
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .hero-h1 { font-size: 40px !important; }
          .hero-p { font-size: 15px !important; }
          .hero-buttons { flex-direction: column !important; }
          .hero-buttons button { width: 100% !important; text-align: center !important; }
          .hero-section { padding: 48px 20px 0 !important; }
          .hero-shinkansen { margin-inline: -20px !important; }
          .hero-now-boarding { font-size: 10px !important; padding: 6px 10px !important; }
        }
      `}</style>
      <section
        className='hero-section'
        style={{
          position: 'relative',
          padding: '72px 48px 0',
          overflow: 'hidden',
        }}
      >
        {/* 背景のドットパターン */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle, ${T.dotBg} 1px, transparent 1.5px)`,
            backgroundSize: '32px 32px',
            pointerEvents: 'none',
          }}
        />

        <div
          className='hero-grid'
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: 56,
            alignItems: 'center',
          }}
        >
          {/* 左: キャッチコピー */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 16px',
                borderRadius: 999,
                background: T.pillBg,
                color: T.primary,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.1em',
                marginBottom: 28,
                border: `1px solid ${T.pillBorder}`,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: T.primary,
                  animation: 'blink 1.4s infinite',
                }}
              />
              小学生のためのプログラミング教室・受付中
            </div>
            <h1
              className='hero-h1'
              style={{
                fontSize: 64,
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                margin: '0 0 28px',
                color: '#ffffff',
              }}
            >
              プラレールが、
              <br />
              <span
                style={{
                  background: `linear-gradient(90deg, ${T.primary}, ${T.primaryGradTo})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                動き出す瞬間
              </span>
              を、
              <br />
              一緒に。
            </h1>
            <p
              className='hero-p'
              style={{
                fontSize: 17,
                lineHeight: 1.85,
                color: T.textMute,
                marginBottom: 36,
                maxWidth: 480,
              }}
            >
              「動かない！なんで？」 —
              そこから始まる、本物のプログラミング。プラレールを M5Stack
              で改造して、自分だけのロボット列車をつくろう。
            </p>
            <div
              className='hero-buttons'
              style={{ display: 'flex', gap: 14, marginBottom: 40 }}
            >
              <button
                type='button'
                style={{
                  background: T.accent,
                  color: 'white',
                  border: 'none',
                  padding: '18px 32px',
                  borderRadius: 14,
                  fontWeight: 800,
                  fontSize: 16,
                  boxShadow: `0 12px 28px -8px ${T.accent}99`,
                  cursor: 'pointer',
                }}
              >
                参加無料！初心者OK 🚄
              </button>
              <a
                href='https://canva.link/1228ax0h69b7h24'
                target='_blank'
                rel='noopener noreferrer'
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: T.surface,
                  color: '#ffffff',
                  border: `1px solid ${T.borderStrong}`,
                  padding: '18px 28px',
                  borderRadius: 14,
                  fontWeight: 700,
                  fontSize: 15,
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                }}
              >
                教材を見てみる
              </a>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[
                '#幼児〜小学生',
                '#少人数制',
                '#M5Stack',
                '#プラレール改造',
                '#課題解決力',
              ].map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 12,
                    padding: '6px 12px',
                    borderRadius: 999,
                    background: T.surface,
                    color: '#ffffff',
                    border: `1px solid ${T.border}`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* 右: ヘッダー画像 + 次回開催バッジ */}
          <div style={{ position: 'relative' }}>
            <div
              className='hero-now-boarding'
              style={{
                position: 'absolute',
                top: -16,
                left: -16,
                background: T.primary,
                color: '#ffffff',
                fontWeight: 900,
                fontSize: 12,
                padding: '8px 14px',
                borderRadius: 999,
                transform: 'rotate(-6deg)',
                zIndex: 2,
                letterSpacing: '0.05em',
              }}
            >
              ⚡ NOW BOARDING
            </div>
            <div
              style={{
                borderRadius: 24,
                overflow: 'hidden',
                aspectRatio: '4/3',
                border: `3px solid ${T.heroBorder}`,
                boxShadow: T.heroOverlay,
              }}
            >
              <img
                src={headerImg}
                alt='授業'
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* ── 次回開催バッジ ──────────────────────────────────────────────
                Supabase の events テーブルの値が反映される。
                date_label と day_of_week を更新すれば自動で変わる。    */}
            <div
              style={{
                position: 'absolute',
                bottom: -20,
                right: -20,
                background: T.accent,
                color: 'white',
                padding: '14px 18px',
                borderRadius: 14,
                transform: 'rotate(4deg)',
                fontWeight: 800,
                fontSize: 16,
                boxShadow: `0 12px 24px -8px ${T.accent}80`,
              }}
            >
              {/* date が設定されていれば「次回 〇〇」、なければ「次回 XX/X (X)」 */}
              {event?.date ? `次回 ${event.date_label}` : '次回 XX/X (X)'}
              <br />
              <span style={{ fontSize: 18 }}>
                【{event?.place_label ?? '場所未定'}】で開催！
              </span>
            </div>
          </div>
        </div>

        {/* 走る新幹線アニメーション */}
        <div
          className='hero-shinkansen'
          style={{
            position: 'relative',
            height: 100,
            marginTop: 64,
            marginInline: -48,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 76,
              left: 0,
              right: 0,
              height: 4,
              background: T.primary,
              opacity: 0.4,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 76,
              left: 0,
              right: 0,
              height: 8,
              backgroundImage: `repeating-linear-gradient(90deg, ${T.primary} 0 24px, transparent 24px 48px)`,
              opacity: 0.3,
              animation: 'rail-tick 0.8s linear infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 24,
              left: 0,
              animation: 'shinkansen-run 12s linear infinite',
            }}
          >
            <ShinkansenSVG
              width={220}
              color={T.primaryStrong}
              accent={T.accent}
            />
          </div>
        </div>
      </section>
    </>
  );
}
