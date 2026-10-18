import { Controller, Get, Header } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

const SITE_URL = 'https://teenagespace.com';

// Разделы каталога (/opportunities/:category); ключи совпадают с NAV_CATS на фронте.
const CATEGORY_KEYS = ['volunteering', 'social', 'eduevent', 'contest', 'hackathon', 'olympiad', 'internship'];

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

/** Generated from live data (not built at deploy time) so a new education track
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
      ...CATEGORY_KEYS.map((k) => ({ loc: `${SITE_URL}/opportunities/${k}` })),
      { loc: `${SITE_URL}/news` },
      { loc: `${SITE_URL}/education` }
    ];

    // Only section/landing pages go in the sitemap — individual event/news/article detail
    // pages are `noindex` (see frontend EventPage/NewsPage/ArticlePage) so Google surfaces
    // the catalog pages instead of one-off cards.
    const tracks = await this.supabase.client.from('education_tracks').select('id');
    const trackUrls: UrlEntry[] = (tracks.data ?? []).map((t) => ({ loc: `${SITE_URL}/education/${t.id}` }));

    return buildSitemapXml([...staticUrls, ...trackUrls]);
  }
}
