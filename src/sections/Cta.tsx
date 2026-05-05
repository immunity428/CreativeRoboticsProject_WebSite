// src/sections/Cta.tsx
import { useTheme } from '../theme/ThemeContext';
import ShinkansenSVG from '../components/ShinkansenSVG';
import eventData from '../data/event.json';

const { next, googleFormId } = eventData;

const GOOGLE_FORM_EMBED_URL = googleFormId
  ? `https://docs.google.com/forms/d/e/${googleFormId}/viewform?embedded=true`
  : null;

export default function Cta() {
  const { tokens: T } = useTheme();

  const badges = [
    `📅 ${next.dateLabel}`,
    `📍 ${next.placeLabel}`,
    `👶 ${next.ageRange}`,
  ];

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .cta-section { padding: 60px 20px !important; }
          .cta-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .cta-h2 { font-size: 36px !important; }
          .cta-badges { gap: 8px !important; }
          .cta-badge { font-size: 12px !important; padding: 6px 12px !important; }
        }
      `}</style>
      <section
        className='cta-section'
        style={{
          position: 'relative',
          padding: '80px 48px',
          overflow: 'hidden',
          background: T.ctaGrad,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle, ${T.ctaDots} 1px, transparent 1.5px)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 30,
            left: 0,
            right: 0,
            opacity: 0.15,
          }}
        >
          <div style={{ animation: 'shinkansen-run 18s linear infinite' }}>
            <ShinkansenSVG width={160} color='white' accent={T.accent} />
          </div>
        </div>

        <div
          className='cta-grid'
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 48,
            alignItems: 'start',
          }}
        >
          {/* 左: コピー */}
          <div style={{ color: 'white' }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: '0.3em',
                color: T.yellow,
                fontWeight: 900,
                marginBottom: 16,
              }}
            >
              🎫 BOARDING NOW
            </div>
            <h2
              className='cta-h2'
              style={{
                fontSize: 52,
                fontWeight: 900,
                lineHeight: 1.15,
                margin: '0 0 20px',
              }}
            >
              参加無料！
              <br />
              <span style={{ color: T.yellow }}>初心者OK！</span>
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                opacity: 0.9,
                margin: '0 0 24px',
              }}
            >
              定員{next.capacity}名 / 定員超過の場合抽選 / 申込み1分で完了
            </p>
            <div
              className='cta-badges'
              style={{
                display: 'flex',
                gap: 12,
                fontSize: 13,
                flexWrap: 'wrap',
              }}
            >
              {badges.map((t) => (
                <div
                  key={t}
                  className='cta-badge'
                  style={{
                    padding: '8px 14px',
                    background: 'rgba(255,255,255,0.15)',
                    borderRadius: 999,
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 32,
                fontSize: 13,
                opacity: 0.8,
                lineHeight: 2,
              }}
            >
              ✅ Googleフォームで安全に受け付けています
              <br />
              ✅ 送信後、メールで詳細をご連絡します
              <br />✅ キャンセルはいつでもOK
            </div>
          </div>

          {/* 右: Google フォーム */}
          <div
            style={{
              background: 'white',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5)',
            }}
          >
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #eee',
                fontSize: 14,
                fontWeight: 800,
                color: '#0e1a2b',
              }}
            >
              🚄 イベントに申し込む
            </div>

            {!GOOGLE_FORM_EMBED_URL ? (
              <div
                style={{
                  padding: 32,
                  textAlign: 'center',
                  color: '#666',
                  minHeight: 360,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                }}
              >
                <div style={{ fontSize: 40 }}>📋</div>
                <div
                  style={{ fontWeight: 800, fontSize: 16, color: '#0e1a2b' }}
                >
                  COMING SOON
                </div>
                <div style={{ fontSize: 14 }}>
                  イベント申し込みフォームを現在準備中です。
                </div>
              </div>
            ) : (
              <iframe
                src={GOOGLE_FORM_EMBED_URL}
                width='100%'
                height='560'
                style={{ border: 0, display: 'block' }}
                title='イベント申し込みフォーム'
                sandbox='allow-scripts allow-forms allow-same-origin'
              >
                読み込んでいます…
              </iframe>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
