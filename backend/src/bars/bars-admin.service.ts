import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from '../supabase/supabase.service';

const TOP_CHATS_LIMIT = 10;
const TRANSCRIPT_LIMIT = 1000;
// Asia/Bishkek is a fixed UTC+6 with no DST, so a plain offset is exact.
const BISHKEK_OFFSET_MS = 6 * 60 * 60 * 1000;

/** USD per 1,000,000 tokens. */
interface ModelPrice {
  input: number;
  output: number;
}

interface SummaryRow {
  messages: number;
  user_messages: number;
  conversations: number;
  active_users: number;
  off_topic: number;
  errors: number;
  plans_created: number;
  reminders_sent: number;
}

interface DailyUsageRow {
  day: string;
  model: string;
  turns: number;
  prompt_tokens: number;
  output_tokens: number;
  thinking_tokens: number;
}

interface ToolRow {
  tool: string;
  calls: number;
}

interface TopChatRow {
  chat_id: number;
  telegram_username: string | null;
  name: string | null;
  messages: number;
  prompt_tokens: number;
  output_tokens: number;
  thinking_tokens: number;
}

interface ChatListRow {
  chat_id: number;
  telegram_username: string | null;
  name: string | null;
  user_id: string | null;
  message_count: number;
  last_activity_at: string;
  has_error: boolean;
  off_topic_count: number;
}

interface MessageRow {
  role: 'user' | 'assistant';
  text: string;
  status: 'ok' | 'off_topic' | 'error' | 'fallback';
  tools: string[] | null;
  created_at: string;
}

function bishkekDayKeys(days: number): string[] {
  const todayMs = Date.now() + BISHKEK_OFFSET_MS;
  const keys: string[] = [];
  for (let i = Math.max(days, 1) - 1; i >= 0; i -= 1) {
    keys.push(new Date(todayMs - i * 86_400_000).toISOString().slice(0, 10));
  }
  return keys;
}

@Injectable()
export class BarsAdminService {
  private readonly logger = new Logger(BarsAdminService.name);
  private readonly prices: Record<string, ModelPrice>;

  constructor(
    private readonly supabase: SupabaseService,
    config: ConfigService
  ) {
    this.prices = this.parsePrices(config.get<string>('BARS_TOKEN_PRICES'));
  }

  /**
   * BARS_TOKEN_PRICES is a JSON map {"<model>": {"input": <usd/1M>, "output": <usd/1M>}}.
   * The code ships without hard Gemini 3 numbers, so an unset/invalid value just means
   * the cost estimate reads 0 and the UI says pricing is not configured.
   */
  private parsePrices(raw?: string): Record<string, ModelPrice> {
    if (!raw) return {};
    try {
      const parsed = JSON.parse(raw) as Record<string, ModelPrice>;
      if (!parsed || typeof parsed !== 'object') return {};
      const clean: Record<string, ModelPrice> = {};
      for (const [model, price] of Object.entries(parsed)) {
        const input = Number(price?.input);
        const output = Number(price?.output);
        if (Number.isFinite(input) && Number.isFinite(output)) clean[model] = { input, output };
      }
      return clean;
    } catch {
      this.logger.warn('BARS_TOKEN_PRICES is not valid JSON; token cost will show as 0');
      return {};
    }
  }

  private priceFor(model: string): ModelPrice | null {
    return this.prices[model.replace(/^models\//, '')] ?? this.prices[model] ?? null;
  }

  async getAnalytics(days: number) {
    const [summaryRes, dailyRes, toolsRes, topChatsRes] = await Promise.all([
      this.supabase.client.rpc('get_bars_summary', { p_days: days }),
      this.supabase.client.rpc('get_bars_daily_usage', { p_days: days }),
      this.supabase.client.rpc('get_bars_tool_usage', { p_days: days }),
      this.supabase.client.rpc('get_bars_top_chats', { p_days: days, p_limit: TOP_CHATS_LIMIT })
    ]);

    for (const r of [summaryRes, dailyRes, toolsRes, topChatsRes]) {
      if (r.error) throw r.error;
    }

    const s = ((summaryRes.data as SummaryRow[]) ?? [])[0];
    const conversations = Number(s?.conversations ?? 0);
    const userMessages = Number(s?.user_messages ?? 0);

    const usageRows = (dailyRes.data as DailyUsageRow[]) ?? [];
    const daily = bishkekDayKeys(days).map((day) => {
      let turns = 0;
      let promptTokens = 0;
      let outputTokens = 0;
      let thinkingTokens = 0;
      let costUsd = 0;
      for (const row of usageRows) {
        if (row.day !== day) continue;
        const prompt = Number(row.prompt_tokens);
        const output = Number(row.output_tokens);
        turns += Number(row.turns);
        promptTokens += prompt;
        outputTokens += output;
        thinkingTokens += Number(row.thinking_tokens);
        const price = this.priceFor(row.model);
        if (price) costUsd += (prompt / 1e6) * price.input + (output / 1e6) * price.output;
      }
      return {
        day,
        turns,
        promptTokens,
        outputTokens,
        thinkingTokens,
        costUsd: Math.round(costUsd * 10000) / 10000
      };
    });

    const tokenTotals = daily.reduce(
      (acc, d) => ({
        promptTokens: acc.promptTokens + d.promptTokens,
        outputTokens: acc.outputTokens + d.outputTokens,
        thinkingTokens: acc.thinkingTokens + d.thinkingTokens
      }),
      { promptTokens: 0, outputTokens: 0, thinkingTokens: 0 }
    );
    const costUsd = Math.round(daily.reduce((sum, d) => sum + d.costUsd, 0) * 10000) / 10000;

    return {
      summary: {
        messages: Number(s?.messages ?? 0),
        userMessages,
        conversations,
        activeUsers: Number(s?.active_users ?? 0),
        offTopic: Number(s?.off_topic ?? 0),
        errors: Number(s?.errors ?? 0),
        plansCreated: Number(s?.plans_created ?? 0),
        remindersSent: Number(s?.reminders_sent ?? 0),
        avgTurnsPerConvo: conversations ? Math.round((userMessages / conversations) * 10) / 10 : 0
      },
      tokenTotals,
      daily,
      costUsd,
      pricingConfigured: Object.keys(this.prices).length > 0,
      tools: ((toolsRes.data as ToolRow[]) ?? []).map((r) => ({
        tool: r.tool,
        calls: Number(r.calls)
      })),
      topChats: ((topChatsRes.data as TopChatRow[]) ?? []).map((r) => ({
        chatId: String(r.chat_id),
        telegramUsername: r.telegram_username,
        name: r.name,
        messages: Number(r.messages),
        promptTokens: Number(r.prompt_tokens),
        outputTokens: Number(r.output_tokens),
        thinkingTokens: Number(r.thinking_tokens)
      }))
    };
  }

  async getChats(days: number) {
    const { data, error } = await this.supabase.client.rpc('get_bars_chat_list', { p_days: days });
    if (error) throw error;
    return ((data as ChatListRow[]) ?? []).map((r) => ({
      chatId: String(r.chat_id),
      telegramUsername: r.telegram_username,
      name: r.name,
      userId: r.user_id,
      messageCount: Number(r.message_count),
      lastActivityAt: r.last_activity_at,
      hasError: r.has_error,
      offTopicCount: Number(r.off_topic_count)
    }));
  }

  async getMessages(chatId: string) {
    const id = Number(chatId);
    if (!Number.isFinite(id)) return [];
    const { data, error } = await this.supabase.client
      .from('bot_messages')
      .select('role, text, status, tools, created_at')
      .eq('chat_id', id)
      .order('created_at', { ascending: true })
      .limit(TRANSCRIPT_LIMIT);
    if (error) throw error;
    return ((data as MessageRow[]) ?? []).map((r) => ({
      role: r.role,
      text: r.text,
      status: r.status,
      tools: r.tools ?? [],
      createdAt: r.created_at
    }));
  }
}
