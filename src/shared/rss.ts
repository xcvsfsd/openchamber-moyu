// 最小 RSS 解析：只要 Moyu 列表需要的 title/link/pubDate/creator/category/description。
// 不引入 cheerio，service 侧够用。
export type RssItem = { title?: string; link?: string; pubDate?: string; creator?: string; category?: string; description?: string };

const tag = (xml: string, name: string): string | undefined => {
  const m = new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, 'i').exec(xml);
  if (!m) return undefined;
  let s = m[1] ?? '';
  // CDATA
  s = s.replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, '$1');
  return s.trim().replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
};

export const parseRss = (body: string): RssItem[] => {
  const items: RssItem[] = [];
  const re = /<item>([\s\S]*?)<\/item>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) {
    const xml = m[1] ?? '';
    items.push({
      title: tag(xml, 'title'),
      link: tag(xml, 'link') ?? tag(xml, 'guid'),
      pubDate: tag(xml, 'pubDate'),
      creator: tag(xml, 'dc:creator') ?? tag(xml, 'creator') ?? tag(xml, 'author'),
      category: tag(xml, 'category'),
      description: tag(xml, 'description'),
    });
  }
  return items;
};
