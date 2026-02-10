/**
 * 自动生成 sitemap.xml 的脚本
 * 可以在构建时自动运行
 */

import { writeFileSync } from 'fs';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

const pages: SitemapUrl[] = [
  {
    loc: 'https://winnew.cn/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: 1.0,
  },
  {
    loc: 'https://winnew.cn/donation',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.5,
  },
  {
    loc: 'https://winnew.cn/about',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.5,
  },
];

function generateSitemap(urls: SitemapUrl[]): string {
  const urlElements = urls
    .map(
      (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

// 生成 sitemap.xml
const sitemap = generateSitemap(pages);
writeFileSync('public/sitemap.xml', sitemap, 'utf-8');

console.log('✅ sitemap.xml generated successfully');
