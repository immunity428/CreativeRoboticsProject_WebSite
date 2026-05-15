// src/sections/Contact.tsx
import { useTheme } from '../theme/ThemeContext';
import { usePage } from '../contexts/PageContext';
import contactData from '../data/contact.json';

// googleFormId だけを取り出す（contactEmail は使わない）
const { googleFormId } = contactData;

// googleFormId が設定されていれば埋め込みURLを生成する
const FORM_URL = googleFormId
  ? `https://docs.google.com/forms/d/e/${googleFormId}/viewform?embedded=true`
  : null;

const CATEGORIES = [
  {
    icon: '🤝',
    title: '協力・スポンサー',
    body: '会場提供・機材協力・資金面でのご支援など、活動に協力いただける個人・団体様を募集しています。',
  },
  {
    icon: '📰',
    title: '取材・メディア',
    body: '教室の取材・記事掲載などのご依頼もお気軽にご連絡ください。',
  },
  {
    icon: '💬',
    title: 'その他のご質問',
    body: '参加に関するご質問や、活動内容についてのお問い合わせもこちらから。',
  },
];

export default function Contact() {
  const { tokens: T } = useTheme();
  const { navigate } = usePage();

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .ct-section { padding: 48px 20px !important; }
          .ct-h1 { font-size: 32px !important; }
          .ct-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
      <section className='ct-section' style={{ padding: '72px 48px' }}>
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
            ★ CONTACT ★
          </div>
          <h1
            className='ct-h1'
            style={{
              fontSize: 48,
              fontWeight: 900,
              lineHeight: 1.2,
              margin: '0 0 16px',
              letterSpacing: '-0.01em',
            }}
          >
            お問い合わせ
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
            協力・スポンサーのご相談、取材・メディアのお問い合わせ、その他ご質問などお気軽にどうぞ。
          </p>
        </div>

        <div
          className='ct-grid'
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: 48,
            alignItems: 'start',
          }}
        >
          {/* 左：案内カード群 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {CATEGORIES.map((item) => (
              <div
                key={item.title}
                style={{
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 16,
                  padding: 24,
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div
                    style={{ fontWeight: 800, fontSize: 15, marginBottom: 6 }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: T.textMute,
                      lineHeight: 1.75,
                    }}
                  >
                    {item.body}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 右：Google フォーム */}
          <div
            style={{
              background: 'white',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 20px 48px -16px rgba(0,0,0,0.4)',
              border: `1px solid ${T.border}`,
            }}
          >
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #eee',
                fontSize: 14,
                fontWeight: 800,
                color: '#0e1a2b',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>🚄</span> お問い合わせフォーム
            </div>

            {/* FORM_URL がある → フォームを埋め込む、ない → COMING SOON を表示 */}
            {FORM_URL ? (
              <iframe
                src={FORM_URL}
                width='100%'
                height='640'
                style={{ border: 0, display: 'block' }}
                title='お問い合わせフォーム'
                sandbox='allow-scripts allow-forms allow-same-origin'
              >
                読み込んでいます…
              </iframe>
            ) : (
              <div
                style={{
                  padding: 48,
                  textAlign: 'center',
                  color: '#666',
                  minHeight: 400,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 14,
                }}
              >
                <div style={{ fontSize: 48 }}>📋</div>
                <div
                  style={{ fontWeight: 800, fontSize: 18, color: '#0e1a2b' }}
                >
                  COMING SOON
                </div>
                <div
                  style={{
                    fontSize: 14,
                    maxWidth: 280,
                    lineHeight: 1.7,
                    color: '#666',
                  }}
                >
                  フォームを現在準備中です。
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
