import { Controller, Get, Header } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

const SITE_URL = 'https://teenagespace.com';

interface UrlEntry {
  loc: string;
  lastmod?: string | null;
}

function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildSitemapXml(urls: UrlEntry[]): string {
  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${escapeXml(u.loc)}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod.slice(0, 10)}</lastmod>` : ''}\n  </url>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

/** Generated from live data (not built at deploy time) so every event/news/article
 *  added through the admin panel is picked up on the next crawl without a redeploy. */
@Controller()
export class SitemapController {
  constructor(private readonly supabase: SupabaseService) {}

  @Get('sitemap.xml')
  @Header('Content-Type', 'application/xml; charset=utf-8')
  @Header('Cache-Control', 'public, max-age=3600, s-maxage=3600')
  async sitemap(): Promise<string> {
    const staticUrls: UrlEntry[] = [
      { loc: `${SITE_URL}/` },
      { loc: `${SITE_URL}/opportunities` },
      { loc: `${SITE_URL}/news` },
      { loc: `${SITE_URL}/education` }
    ];

    const [events, news, tracks, materials] = await Promise.all([
      this.supabase.client.from('events').select('id, created_at').eq('archived', false),
      this.supabase.client.from('news').select('id, event_date'),
      this.supabase.client.from('education_tracks').select('id'),
      this.supabase.client.from('materials').select('id')
    ]);

    const eventUrls: UrlEntry[] = (events.data ?? []).map((e) => ({
      loc: `${SITE_URL}/opportunities/event/${e.id}`,
      lastmod: e.created_at
    }));
    const newsUrls: UrlEntry[] = (news.data ?? []).map((n) => ({
      loc: `${SITE_URL}/news/${n.id}`,
      lastmod: n.event_date
    }));
    const trackUrls: UrlEntry[] = (tracks.data ?? []).map((t) => ({ loc: `${SITE_URL}/education/${t.id}` }));
    const articleUrls: UrlEntry[] = (materials.data ?? []).map((m) => ({ loc: `${SITE_URL}/article/${m.id}` }));

    return buildSitemapXml([...staticUrls, ...eventUrls, ...newsUrls, ...trackUrls, ...articleUrls]);
  }
}
