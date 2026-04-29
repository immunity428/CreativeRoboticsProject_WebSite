// src/sections/ActivityReport.tsx
import { useTheme } from './theme/ThemeContext';
import { usePage } from './contexts/PageContext';

const REPORTS = [
  {
    date: '2026.03.15',
    title: '第3回 ロボット創造教室 開催',
    place: '公立諏訪東京理科大学',
    participants: 6,
    body: 'M5Stack を用いたプラレール改造ワークショップを実施。参加者全員が自分のロボット列車を完成させ、最後の発表会では工夫したポイントを堂々と語ってくれました。保護者の方からも「子どもの集中力に驚いた」との声をいただきました。',
    tags: ['#M5Stack', '#プラレール', '#発表会'],
    color: 'primary' as const,
  },
  {
    date: '2026.01.20',
    title: '第2回 ロボット創造教室 開催',
    place: 'コミン家',
    participants: 5,
    body: '「センサーで止まる電車」をテーマに開催。超音波センサーを使って障害物を検知する仕組みに挑戦。最初は戸惑っていた子どもたちも、試行錯誤しながら自分なりの解を見つけていく姿が印象的でした。',
    tags: ['#センサー', '#試行錯誤', '#少人数制'],
    color: 'accent' as const,
  },
  {
    date: '2025.11.10',
    title: '第1回 ロボット創造教室 開催',
    place: 'かふぇ天香',
    participants: 4,
    body: '記念すべき第1回。プラレールを M5Stack で制御することからスタート。「動いた！」という瞬間の歓声が忘れられません。子どもたちの「なぜ？」「どうして？」が止まらない、そんな1日でした。',
    tags: ['#初回開催', '#プログラミング入門'],
    color: 'yellow' as const,
  },
];

export default function ActivityReport() {
  const { tokens: T } = useTheme();
  const { navigate } = usePage();

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
            「動いた！」「できた！」が生まれた瞬間を共有します。
          </p>
        </div>

        {/* 統計サマリー */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 16,
            marginBottom: 56,
          }}
        >
          {[
            { k: '開催回数', v: '3回', emoji: '🚄' },
            { k: '延べ参加者', v: '15名', emoji: '👶' },
            { k: '完成作品', v: '15台', emoji: '🤖' },
            { k: '笑顔', v: '∞', emoji: '😄' },
          ].map((s) => (
            <div
              key={s.k}
              style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: 16,
                padding: 20,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>{s.emoji}</div>
              <div
                style={{
                  fontSize: 11,
                  color: T.primary,
                  letterSpacing: '0.2em',
                  fontWeight: 800,
                  marginBottom: 6,
                }}
              >
                {s.k}
              </div>
              <div style={{ fontSize: 22, fontWeight: 900 }}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* レポート一覧 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {REPORTS.map((r, i) => {
            const accentColor =
              r.color === 'primary'
                ? T.primary
                : r.color === 'accent'
                  ? T.accent
                  : T.yellow;
            return (
              <article
                key={r.date}
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
                {/* 装飾ライン */}
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

                {/* 左：日付エリア */}
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
                    REPORT {String(REPORTS.length - i).padStart(2, '0')}
                  </div>
                  <div
                    style={{ fontSize: 22, fontWeight: 900, marginBottom: 10 }}
                  >
                    {r.date}
                  </div>
                  <div
                    style={{
                      display: 'inline-flex',
                      gap: 6,
                      alignItems: 'center',
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: `${accentColor}15`,
                      color: accentColor,
                      fontSize: 11,
                      fontWeight: 800,
                    }}
                  >
                    👶 {r.participants}名参加
                  </div>
                </div>

                {/* 右：本文 */}
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
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {r.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 11,
                          padding: '4px 10px',
                          borderRadius: 999,
                          background: T.bgDeep,
                          color: T.textMute2,
                          border: `1px solid ${T.border}`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* 下部CTA */}
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
