/**
 * The catalog keeps its filter state (themes, price, level, age, q, sort) in the
 * URL query string. When the user drills into a category from the sidebar,
 * mobile subtabs or a homepage tile, that navigation must carry the query over —
 * otherwise picking a category silently wipes an active search / sort / filter
 * (P0 "память фильтров").
 *
 * Everything is carried except `event` — that's the open-card modal param, and
 * re-applying it on a different category would pop the modal back open.
 */
export function carryCatalogSearch(search: string): string {
  const params = new URLSearchParams(search);
  params.delete('event');
  const s = params.toString();
  return s ? `?${s}` : '';
}
