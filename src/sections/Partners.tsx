// src/sections/Partners.tsx
import { useTheme } from '../theme/ThemeContext';
import { usePage } from '../contexts/PageContext';

const PARTNERS = [
  {
    name: '公立諏訪東京理科大学',
    type: '会場提供・技術協力',
    body: '学生による技術サポートと、最新のIoT機材を活用した学習環境を提供いただいています。大学生講師との交流は、子どもたちにとって大きな刺激になっています。',
    icon: '🎓',
    tags: ['会場提供', '学生講師', '技術指導'],
    color: 'primary' as const,
  },
  {
    name: 'コミン家',
    type: '会場提供',
    body: '地域コミュニティの拠点として、温かみのある空間を会場として提供いただいています。子どもたちがリラックスして学べる環境づくりに貢献いただいています。',
    icon: '🏠',
    tags: ['会場提供', '地域連携'],
    color: 'yellow' as const,
  },
  {
    name: 'かふぇ天香',
    type: '会場提供・運営協力',
    body: '創造的な活動にぴったりのカフェ空間を会場として提供。保護者の方の待ち時間にも快適に過ごしていただけます。',
    icon: '☕',
    tags: ['会場提供', '保護者サポート'],
    color: 'accent' as const,
  },
];

const SUPPORTERS = [
  { name: '地域の保護者の皆さま', role: 'ご支援・口コミ' },
  { name: 'ボランティア大学生', role: '授業サポート' },
  { name: '茅野市の地域団体', role: '活動の周知協力' },
];

export default function Partners() {
  const { tokens: T } = useTheme();
  const { navigate } = usePage();

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .pt-section { padding: 48px 20px !important; }
          .pt-h1 { font-size: 32px !important; }
          .pt-grid { grid-template-columns: 1fr !important; }
          .pt-card { padding: 24px !important; }
        }
      `}</style>
      <section className='pt-section' style={{ padding: '72px 48px' }}>
        {/* 戻るボタン */}
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

        {/* ヘッダ */}
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
            ★ OUR PARTNERS ★
          </div>
          <h1
            className='pt-h1'
            style={{
              fontSize: 48,
              fontWeight: 900,
              lineHeight: 1.2,
              margin: '0 0 16px',
              letterSpacing: '-0.01em',
            }}
          >
            協力団体のご紹介
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
            ロボット創造教室は、地域の皆さまのご協力によって支えられています。
            会場提供・技術協力・運営サポートをいただいているパートナーをご紹介します。
          </p>
        </div>

        {/* メインパートナー一覧 */}
        <div
          className='pt-grid'
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 20,
            marginBottom: 64,
          }}
        >
          {PARTNERS.map((p) => {
            const accentColor =
              p.color === 'primary'
                ? T.primary
                : p.color === 'accent'
                  ? T.accent
                  : T.yellow;
            return (
              <div
                key={p.name}
                className='pt-card'
                style={{
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 20,
                  padding: 32,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* 背景装飾 */}
                <div
                  style={{
                    position: 'absolute',
                    top: -30,
                    right: -30,
                    fontSize: 120,
                    opacity: 0.08,
                  }}
                >
                  {p.icon}
                </div>

                {/* アイコン */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: `${accentColor}20`,
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 28,
                    marginBottom: 20,
                    border: `1px solid ${accentColor}40`,
                  }}
                >
                  {p.icon}
                </div>

                {/* ラベル */}
                <div
                  style={{
                    fontSize: 11,
                    color: accentColor,
                    letterSpacing: '0.2em',
                    fontWeight: 800,
                    marginBottom: 8,
                  }}
                >
                  {p.type}
                </div>

                {/* 名称 */}
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 900,
                    margin: '0 0 14px',
                    lineHeight: 1.4,
                  }}
                >
                  {p.name}
                </h2>

                {/* 本文 */}
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.85,
                    color: T.textMute,
                    margin: '0 0 20px',
                    flex: 1,
                  }}
                >
                  {p.body}
                </p>

                {/* タグ */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 11,
                        padding: '4px 10px',
                        borderRadius: 999,
                        background: T.bgDeep,
                        color: T.textMute2,
                        border: `1px solid ${T.border}`,
                        fontWeight: 600,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* サポーター一覧 */}
        <div
          style={{
            background: T.bgDeep,
            borderRadius: 20,
            padding: 40,
            border: `1px solid ${T.border}`,
            marginBottom: 48,
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
            ★ SUPPORTERS ★
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 900, margin: '0 0 24px' }}>
            活動を支えてくださる皆さま
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 12,
            }}
          >
            {SUPPORTERS.map((s) => (
              <div
                key={s.name}
                style={{
                  padding: 18,
                  background: T.surface,
                  borderRadius: 12,
                  border: `1px solid ${T.border}`,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: T.primary,
                    letterSpacing: '0.15em',
                    marginBottom: 6,
                    fontWeight: 800,
                  }}
                >
                  {s.role}
                </div>
                <div style={{ fontSize: 15, fontWeight: 800 }}>{s.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* お問い合わせCTA */}
        <div
          style={{
            padding: 40,
            background: `linear-gradient(135deg, ${T.primary}15, ${T.accent}10)`,
            borderRadius: 20,
            textAlign: 'center',
            border: `1px solid ${T.primary}30`,
          }}
        >
          <div style={{ fontSize: 24, marginBottom: 12 }}>🤝</div>
          <h3 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 12px' }}>
            協力・スポンサー募集中
          </h3>
          <p
            style={{
              fontSize: 14,
              color: T.textMute,
              lineHeight: 1.85,
              margin: '0 0 24px',
              maxWidth: 480,
              marginInline: 'auto',
            }}
          >
            会場提供・機材協力・資金面でのご支援など、私たちの活動に協力いただける
            個人・団体様を募集しています。お気軽にご相談ください。
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
            お問い合わせはトップから →
          </button>
        </div>
      </section>
    </>
  );
}
