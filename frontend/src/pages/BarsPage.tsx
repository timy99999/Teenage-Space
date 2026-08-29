import { useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBarsChats, useBarsChat } from '../hooks/useBars';
import type { BarsChatRow, BarsMessageStatus } from '../types';

const WINDOW_DAYS = 14;

const STATUS_LABELS: Record<BarsMessageStatus, string> = {
  ok: '',
  off_topic: 'не по теме',
  error: 'сбой',
  fallback: 'не собрал ответ'
};

function chatTitle(chat: BarsChatRow): string {
  if (chat.name) return chat.name;
  if (chat.telegramUsername) return `@${chat.telegramUsername}`;
  return `Чат ${chat.chatId}`;
}

function fmtWhen(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function Transcript({ chatId }: { chatId: string }) {
  const { messages, loading } = useBarsChat(chatId);

  if (loading && !messages) return <p className="ts-center-note">Загрузка переписки...</p>;
  if (!messages || messages.length === 0)
    return <p className="ts-center-note">Сообщений в этом окне хранения нет.</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {messages.map((m, i) => {
        const mine = m.role === 'assistant';
        return (
          <div
            key={i}
            style={{
              alignSelf: mine ? 'flex-start' : 'flex-end',
              maxWidth: '85%',
              background: mine ? 'var(--ts-surface-2, rgba(127,127,127,0.12))' : 'var(--ts-accent-soft, rgba(80,130,255,0.14))',
              borderRadius: 12,
              padding: '8px 12px'
            }}
          >
            <div style={{ fontSize: 11, opacity: 0.6, marginBottom: 3 }}>
              {mine ? 'Барс' : 'Пользователь'} · {fmtWhen(m.createdAt)}
              {m.status !== 'ok' && (
                <span className="ts-badge" style={{ marginLeft: 6 }}>
                  {STATUS_LABELS[m.status]}
                </span>
              )}
            </div>
            <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{m.text}</div>
            {m.tools.length > 0 && (
              <div style={{ marginTop: 4, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {m.tools.map((t, j) => (
                  <span key={j} className="ts-badge" style={{ opacity: 0.75 }}>
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function BarsPage() {
  const { profile, isSuperAdmin } = useAuth();
  const { chats } = useBarsChats(WINDOW_DAYS);
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!chats) return [];
    const q = query.trim().toLowerCase();
    if (!q) return chats;
    return chats.filter((c) =>
      [c.name, c.telegramUsername, c.chatId].some((v) => (v ?? '').toLowerCase().includes(q))
    );
  }, [chats, query]);

  const totals = useMemo(() => {
    const list = chats ?? [];
    return {
      conversations: list.length,
      messages: list.reduce((s, c) => s + c.messageCount, 0),
      withError: list.filter((c) => c.hasError).length,
      offTopic: list.reduce((s, c) => s + c.offTopicCount, 0)
    };
  }, [chats]);

  if (profile && !isSuperAdmin) {
    return (
      <div className="ts-page">
        <h1 className="ts-page-title">Барс</h1>
        <p className="ts-center-note">Доступ только для главного администратора.</p>
      </div>
    );
  }

  return (
    <div className="ts-page">
      <h1 className="ts-page-title">Барс</h1>
      <p className="desc" style={{ marginTop: 4 }}>
        Переписки Телеграм-агента за последние {WINDOW_DAYS} дней — для контроля качества
        ответов. Хранятся 30 дней, затем удаляются.
      </p>

      <div className="ts-card-panel" style={{ marginTop: 16 }}>
        <div className="ts-admin-stats">
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{totals.conversations}</div>
            <div className="desc">диалогов</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{totals.messages}</div>
            <div className="desc">сообщений</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{totals.withError}</div>
            <div className="desc">со сбоями</div>
          </div>
          <div className="ts-admin-stat">
            <div className="ts-admin-stat-value">{totals.offTopic}</div>
            <div className="desc">ответов не по теме</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 320px', minWidth: 280 }}>
          <input
            className="ts-input"
            placeholder="Поиск по имени или @username"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: '100%', marginBottom: 10 }}
          />
          {!chats ? (
            <p className="ts-center-note">Загрузка...</p>
          ) : filtered.length === 0 ? (
            <p className="ts-center-note">Диалогов не найдено.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {filtered.map((c) => (
                <button
                  key={c.chatId}
                  className="ts-card-panel"
                  onClick={() => setSelected(c.chatId)}
                  style={{
                    textAlign: 'left',
                    cursor: 'pointer',
                    padding: '10px 12px',
                    borderWidth: selected === c.chatId ? 2 : undefined,
                    borderColor: selected === c.chatId ? 'var(--ts-accent, #5082ff)' : undefined
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <strong>{chatTitle(c)}</strong>
                    <span className="desc">{fmtWhen(c.lastActivityAt)}</span>
                  </div>
                  <div className="desc" style={{ marginTop: 2 }}>
                    {c.messageCount} сообщений
                    {c.hasError && (
                      <span className="ts-badge" style={{ marginLeft: 6 }}>
                        сбой
                      </span>
                    )}
                    {c.offTopicCount > 0 && (
                      <span className="ts-badge" style={{ marginLeft: 6 }}>
                        не по теме: {c.offTopicCount}
                      </span>
                    )}
                    {!c.userId && (
                      <span className="ts-badge" style={{ marginLeft: 6 }}>
                        не привязан
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ flex: '1 1 380px', minWidth: 300 }}>
          {selected ? (
            <div className="ts-card-panel">
              <Transcript chatId={selected} />
            </div>
          ) : (
            <p className="ts-center-note">Выбери диалог слева, чтобы посмотреть переписку.</p>
          )}
        </div>
      </div>
    </div>
  );
}
